package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.model.dto.DataMailDTO;
import com.hgbaodev.backend.service.MailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Service
public class MailServiceImpl implements MailService {
    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String sender;

    @Autowired
    SpringTemplateEngine templateEngine;

    @Override
    public void sendHTMLMail(DataMailDTO dataMail, String templateName) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();

        MimeMessageHelper helper;

        try {
            Context context = new Context();
            context.setVariables(dataMail.getProps());

            String html = templateEngine.process(templateName, context);

            helper = new MimeMessageHelper(message, true);
            helper.setFrom(sender);
            helper.setTo(dataMail.getTo());
            helper.setSubject(dataMail.getSubject());
            helper.setText(html, true);

            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
