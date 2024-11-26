package com.hgbaodev.backend.service;

import com.hgbaodev.backend.dto.request.medicalRecord.AddMedicalRecordRequest;
import com.hgbaodev.backend.dto.request.medicalRecord.UpdateMedicalRecordRequest;
import com.hgbaodev.backend.dto.response.MedicalRecordResponse;
import com.hgbaodev.backend.utils.CustomPagination;
import org.springframework.data.domain.Page;
import com.hgbaodev.backend.model.MedicalRecord;

import java.util.Optional;

public interface MedicalRecordService {
    MedicalRecord addMedicalRecord(AddMedicalRecordRequest addMedicalRecordRequest);
    MedicalRecord updateMedicalRecord(UpdateMedicalRecordRequest updateMedicalRecordRequest);
    void deleteMedicalRecord(Integer medicalRecordID);
    CustomPagination<MedicalRecordResponse> getAllMedicalRecords(int page, int size, String keyword, Integer userID, Long memberId);
    Optional<MedicalRecord> findMedicalRecordById(Integer medicalRecordID);
}
