package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.model.EmergencyContact;
import com.hgbaodev.backend.model.Member;
import com.hgbaodev.backend.repository.EmergencyContactRepository;
import com.hgbaodev.backend.repository.MemberRepository;
import com.hgbaodev.backend.service.EmergencyContactService;
import com.hgbaodev.backend.service.MemberService;
import com.hgbaodev.backend.utils.CustomPagination;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmergencyContactServiceImpl implements EmergencyContactService {

    private final EmergencyContactRepository emergencyContactRepository;


    public EmergencyContact save(EmergencyContact emergencyContact) {
        // Kiểm tra ràng buộc nghiệp vụ (nếu cần)
        if (emergencyContact.getName() == null || emergencyContact.getPhoneNumber() == null) {
            throw new IllegalArgumentException("Name and Phone Number cannot be null");
        }

        return emergencyContactRepository.save(emergencyContact);


    }

    @Override
    public EmergencyContact addEmergencyContact(EmergencyContact emergencyContact) {
        return emergencyContactRepository.save(emergencyContact);
    }


    @Override
    public EmergencyContact updateEmergencyContact (EmergencyContact emergencyContact) {
        EmergencyContact check = emergencyContactRepository.findById(emergencyContact.getId())
                .orElseThrow(() -> new IllegalArgumentException("Emergency contact not found"));
        emergencyContact.setUser(check.getUser());
        return emergencyContactRepository.save(emergencyContact);
    }

    @Override
    public void deleteEmergencyContact(Integer contactID) {
        emergencyContactRepository.deleteById(contactID);
    }

    @Override
    public EmergencyContact getEmergencyContactById(Integer contactID) {
        return emergencyContactRepository.findById(contactID)
                .orElseThrow(() -> new EntityNotFoundException("Emergency contact not found for ID: " + contactID));
    }



    @Override
    public CustomPagination<EmergencyContact> getAllEmergencyContacts(int page, int size, String keyword) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<EmergencyContact> emergencyContactPage = emergencyContactRepository.findByKeyword(keyword,  pageable);
        CustomPagination<EmergencyContact> customPagination = new CustomPagination<>(emergencyContactPage);
        return customPagination;
    }
}
