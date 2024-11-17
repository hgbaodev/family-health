package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.dto.response.ContactResponse;
import com.hgbaodev.backend.model.Contact;
import com.hgbaodev.backend.repository.ContactRepository;
import com.hgbaodev.backend.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements ContactService {

    private final ContactRepository repository;

    @Override
    public Page<ContactResponse> getAllContacts(int page, int size, String keyword) {
        Pageable pageable = PageRequest.of(page - 1, size);
        if(keyword != null && !keyword.isEmpty()) {
            return repository.findByKeyword(keyword, pageable);
        }
        return repository.findAllContacts(pageable);
    }

    @Override
    public Contact updateSeenStateUser(Integer id) {
        Contact contact = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Contact is not found!!!"));

        if (contact.isStatus()) return contact;
        contact.setStatus(true);
        return repository.save(contact);
    }
}
