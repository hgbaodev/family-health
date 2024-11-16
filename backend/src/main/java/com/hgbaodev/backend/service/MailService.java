package com.hgbaodev.backend.service;

import com.hgbaodev.backend.dto.response.DataMailDTO;
import jakarta.mail.MessagingException;

public interface MailService {
    void sendHTMLMail(DataMailDTO dataMail, String templateName) throws MessagingException;
}
