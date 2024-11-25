package com.hgbaodev.backend.service;

import com.hgbaodev.backend.dto.response.ContactResponse;
import com.hgbaodev.backend.model.Contact;
import org.springframework.data.domain.Page;

public interface ContactService {
    Page<ContactResponse> getAllContacts(int page, int size, String keyword);
    Contact updateSeenStateUser(Integer id);
    long countContactsReceivedToday();
}

