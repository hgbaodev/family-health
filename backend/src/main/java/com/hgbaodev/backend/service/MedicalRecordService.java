package com.hgbaodev.backend.service;

import org.springframework.data.domain.Page;
import com.hgbaodev.backend.model.MedicalRecord;

import java.util.Optional;

public interface MedicalRecordService {
    //CRUD
    MedicalRecord addMedicalRecord(MedicalRecord medicalRecord);
    MedicalRecord updateMedicalRecord(MedicalRecord medicalRecord);
    void deleteMedicalRecord(Integer medicalRecordID);
    Page<MedicalRecord> getAllMedicalRecords(int page,int size, String keyword,Integer userID);
    //Search
    Optional<MedicalRecord> findMedicalRecordById(Integer medicalRecordID);
}
