package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.model.User;
import com.hgbaodev.backend.repository.UserRepository;
import com.hgbaodev.backend.request.users.ChangePasswordRequest;
import com.hgbaodev.backend.service.AuthenticationService;
import com.hgbaodev.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository repository;
    private final AuthenticationService authenticationService;


    @Override
    public User getInfoCurrentUser() {
        User user =repository.findByEmail("user@mail.com").orElseThrow();
        return user;
    }

    @Override
    public User updateInfoCurrentUser(User updateUser) {
        User checkUser = repository.findById(updateUser.getId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        updateUser.setId(checkUser.getId());
        checkUser.setFirstname(updateUser.getFirstname());
        checkUser.setLastname(updateUser.getLastname());
        checkUser.setPhoneNumber(updateUser.getPhoneNumber());
        return repository.save(checkUser);
    }
//    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {
//
//        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();
//        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
//            throw new IllegalStateException("Wrong password");
//        }
//        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
//            throw new IllegalStateException("Password are not the same");
//        }
//
//        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
//        repository.save(user);
//    }
public void changePassword(ChangePasswordRequest request) {
    // Truy xuất thông tin người dùng từ cơ sở dữ liệu dựa vào email hoặc ID từ Principal
    String email = authenticationService.getCurrentUser().getEmail();
    User user = repository.findByEmail(email).orElseThrow(() ->
            new IllegalArgumentException("User not found"));

    // Kiểm tra mật khẩu hiện tại
    if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
        throw new IllegalStateException("Mật khẩu hiện tại không đúng.");
    }

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu mới
    if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
        throw new IllegalStateException("Mật khẩu mới và xác nhận mật khẩu không trùng khớp.");
    }

    // Cập nhật mật khẩu mới
    user.setPassword(passwordEncoder.encode(request.getNewPassword()));
    repository.save(user);
}

}
