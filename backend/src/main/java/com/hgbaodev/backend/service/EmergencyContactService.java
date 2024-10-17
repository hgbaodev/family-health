package com.hgbaodev.backend.service;

import com.hgbaodev.backend.model.EmergencyContact;
import org.springframework.data.domain.Page;

public interface EmergencyContactService {
    EmergencyContact addEmergencyContact(EmergencyContact emergencyContact);
    EmergencyContact updateEmergencyContact(EmergencyContact emergencyContact);
    void deleteEmergencyContact(Integer contactID);
    EmergencyContact getEmergencyContactById(Integer contactID);
    Page<EmergencyContact> getAllEmergencyContacts(int page, int size, String keyword);

}
