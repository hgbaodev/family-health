package com.hgbaodev.backend.service;

import com.hgbaodev.backend.dto.request.medicalRecord.AddMedicalRecordRequest;
import org.springframework.data.domain.Page;
import com.hgbaodev.backend.model.MedicalRecord;

import java.util.Optional;

public interface MedicalRecordService {
    MedicalRecord addMedicalRecord(AddMedicalRecordRequest addMedicalRecordRequest);
    MedicalRecord updateMedicalRecord(MedicalRecord medicalRecord);
    void deleteMedicalRecord(Integer medicalRecordID);
    Page<MedicalRecord> getAllMedicalRecords(int page,int size, String keyword,Integer userID);
    Optional<MedicalRecord> findMedicalRecordById(Integer medicalRecordID);
}
