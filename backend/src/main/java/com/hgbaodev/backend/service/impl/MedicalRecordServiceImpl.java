package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.dto.request.medicalRecord.AddMedicalRecordRequest;
import com.hgbaodev.backend.dto.request.medicalRecord.DocumentRequest;
import com.hgbaodev.backend.dto.request.medicalRecord.MedicationRequest;
import com.hgbaodev.backend.model.Document;
import com.hgbaodev.backend.model.MedicalRecord;
import com.hgbaodev.backend.model.Medication;
import com.hgbaodev.backend.model.Member;
import com.hgbaodev.backend.repository.DocumentRepository;
import com.hgbaodev.backend.repository.MedicalRecordRepository;
import com.hgbaodev.backend.repository.MedicationRepository;
import com.hgbaodev.backend.service.CloudinaryService;
import com.hgbaodev.backend.service.MedicalRecordService;
import com.hgbaodev.backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MedicalRecordServiceImpl implements MedicalRecordService {
    private final MedicalRecordRepository medicalRecordRepository;
    private final MedicationRepository medicationRepository;
    private final DocumentRepository documentRepository;
    private final MemberService memberService;
    private final CloudinaryService cloudinaryService;

    @Override
    public MedicalRecord addMedicalRecord(AddMedicalRecordRequest addMedicalRecordRequest) {
        Member member = memberService.getMemberById(addMedicalRecordRequest.getMemberId());
        MedicalRecord medicalRecord = MedicalRecord.builder()
                .member(member)
                .date(addMedicalRecordRequest.getDate())
                .doctor(addMedicalRecordRequest.getDoctor())
                .symptoms(addMedicalRecordRequest.getSymptoms())
                .diagnosis(addMedicalRecordRequest.getDiagnosis())
                .treatment(addMedicalRecordRequest.getTreatment())
                .facilityName(addMedicalRecordRequest.getFacilityName())
                .build();
        medicalRecord = medicalRecordRepository.save(medicalRecord);
        for(MedicationRequest medicationRequest : addMedicalRecordRequest.getMedications()){
            Medication medication = Medication.builder()
                    .record(medicalRecord)
                    .name(medicationRequest.getName())
                    .startDate(medicationRequest.getStartDate())
                    .endDate(medicationRequest.getEndDate())
                    .position(medicationRequest.getPosition())
                    .frequency(medicationRequest.getFrequency())
                    .build();
            medicationRepository.save(medication);
        }
        for (DocumentRequest documentRequest : addMedicalRecordRequest.getDocuments()){
            Document document = Document.builder()
                    .record(medicalRecord)
                    .name(documentRequest.getName())
                    .position(documentRequest.getPosition())
                    .size(documentRequest.getSize())
                    .type(documentRequest.getType())
                    .path(documentRequest.getPath())
                    .build();
            documentRepository.save(document);
        }
        return medicalRecord;
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
