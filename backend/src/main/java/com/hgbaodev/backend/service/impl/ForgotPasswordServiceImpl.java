package com.hgbaodev.backend.service.impl;

import com.github.benmanes.caffeine.cache.Cache;
import com.hgbaodev.backend.dto.response.DataMailDTO;
import com.hgbaodev.backend.repository.UserRepository;
import com.hgbaodev.backend.service.ForgotPasswordService;
import com.hgbaodev.backend.service.MailService;
import com.hgbaodev.backend.utils.Const;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Slf4j
public class ForgotPasswordServiceImpl implements ForgotPasswordService {

    private final UserRepository userRepository;
    private final MailService mailService;
    private final Cache<String, String> otpCache;
    private final PasswordEncoder passwordEncoder;

    private Random random = new Random();

    private String generateAndStoreOTP(String email) {
        if(otpCache.getIfPresent(email) != null)
            otpCache.invalidate(email);

        int randomNumber = 100000 + random.nextInt(900000);
        String otp = String.valueOf(randomNumber);

        otpCache.put(email, otp);

        return otp;
    }

    public String getOTP(String email) {
        return otpCache.getIfPresent(email);
    }

    private boolean checkOTP(String email, String otp) {
        String otpStore = getOTP(email);

        return otpStore != null && otpStore.equals(otp);
    }

    private void sendMail (String email, Map<String, Object> props, String feature ) {
        String subject = "";
        String file = "";

        if(feature == "CLIENT_FORGOT_PASSWORD_OTP"){
            subject = Const.SEND_MAIL_SUBJECT.CLIENT_FORGOT_PASSWORD_OTP;
            file = Const.TEMPLATE_FILE_NAME.CLIENT_FORGOT_PASSWORD_OTP;
        } else if (feature == "CLIENT_FORGOT_PASSWORD_NEW_PASSWORD") {
            subject = Const.SEND_MAIL_SUBJECT.CLIENT_FORGOT_PASSWORD_NEW_PASSWORD;
            file = Const.TEMPLATE_FILE_NAME.CLIENT_FORGOT_PASSWORD_NEW_PASSWORD;
        }

        try {
            DataMailDTO dataMail = new DataMailDTO();

            dataMail.setTo(email);
            dataMail.setSubject(subject);
            dataMail.setProps(props);

            mailService.sendHTMLMail(dataMail, file);
        } catch (MessagingException e) {
            e.printStackTrace();
        }

    }

    @Override
    public String sendOTP(String email) {
        var userWithEmail = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email is not exits!"));

        String otp = generateAndStoreOTP(userWithEmail.getEmail());

        // Gửi mail xác thực
        Map<String, Object> props = new HashMap<>();
        props.put("name", userWithEmail.getFirstname());
        props.put("otp", otp);

        sendMail(userWithEmail.getEmail(), props, "CLIENT_FORGOT_PASSWORD_OTP");

        return "Send OTP successfully";
    }

    @Override
    public String sendNewPassword(String email, String otp) {

        boolean check = checkOTP(email, otp);

        if(check) {
            int randomNumber = 10000000 + random.nextInt(90000000);
            String newPassword = String.valueOf(randomNumber);

            var userWithEmail = userRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            userWithEmail.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(userWithEmail);

            // Gửi mail password vừa tạo
            Map<String, Object> props = new HashMap<>();
            props.put("name", userWithEmail.getFirstname());
            props.put("newPassword", newPassword);

            sendMail(email, props, "CLIENT_FORGOT_PASSWORD_NEW_PASSWORD");

            return "Xác thực thành công, mật khẩu mới đã được gửi đến email của bạn.";
        } else {
            return null;
        }
    }
}
