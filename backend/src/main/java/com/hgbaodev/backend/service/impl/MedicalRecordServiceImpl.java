package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.model.MedicalRecord;
import com.hgbaodev.backend.repository.MedicalRecordRepository;
import com.hgbaodev.backend.service.MedicalRecordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MedicalRecordServiceImpl implements MedicalRecordService {
    private final MedicalRecordRepository medicalRecordRepository;

    @Override
    public MedicalRecord addMedicalRecord(MedicalRecord medicalRecord) {
        return medicalRecordRepository.save(medicalRecord);
    }

    @Override
    public MedicalRecord updateMedicalRecord(MedicalRecord medicalRecord) {
        MedicalRecord check = medicalRecordRepository.findById(medicalRecord.getId())
                .orElseThrow(() -> new IllegalArgumentException("MedicalRecord not found "));
        return medicalRecordRepository.save(medicalRecord);
    }

    @Override
    public void deleteMedicalRecord(Integer medicalRecordID){
        MedicalRecord check = medicalRecordRepository.findById(medicalRecordID)
                .orElseThrow(() -> new IllegalArgumentException("Medical Record not found"));
        medicalRecordRepository.deleteById(check.getId());
    }

    @Override
    public Page<MedicalRecord> getAllMedicalRecords(int page, int size, String keyword,Integer userID) {
        Pageable pageable = PageRequest.of(page - 1, size);
        if (keyword != null && !keyword.isEmpty()) {
            return medicalRecordRepository.findByKeyword(keyword, userID,pageable);
        }
        return medicalRecordRepository.findAllByUserID(pageable,userID);
    }
    @Override
    public Optional<MedicalRecord> findMedicalRecordById(Integer medicalRecordID){
        return medicalRecordRepository.findById(medicalRecordID);
    }
}
