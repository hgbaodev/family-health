package com.hgbaodev.backend.service;

import com.hgbaodev.backend.model.dto.DataMailDTO;
import jakarta.mail.MessagingException;

public interface MailService {
    void sendHTMLMail(DataMailDTO dataMail, String templateName) throws MessagingException;
}
