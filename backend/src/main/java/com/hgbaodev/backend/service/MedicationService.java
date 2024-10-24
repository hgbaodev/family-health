package com.hgbaodev.backend.service;

import com.hgbaodev.backend.model.Medication;
import org.springframework.data.domain.Page;


public interface MedicationService {
    Medication addMedication(Medication medication);
    Medication updateMedication(Medication medication);
    void deleteMedication(Integer medicationID);
    Medication getMedicationById(Integer medicationID);
    Page<Medication> getAllMedications(int page, int size, String keyword,Integer userID);
}
