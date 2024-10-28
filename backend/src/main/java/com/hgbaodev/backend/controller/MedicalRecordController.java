package com.hgbaodev.backend.controller;


import com.hgbaodev.backend.model.MedicalRecord;
import com.hgbaodev.backend.model.User;
import com.hgbaodev.backend.request.medicalRecord.UpdateMedicalRecordRequest;
import com.hgbaodev.backend.request.medicalRecord.AddMedicalRecordRequest;
import com.hgbaodev.backend.response.ApiResponse;
import com.hgbaodev.backend.service.AuthenticationService;
import com.hgbaodev.backend.service.MedicalRecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/medical-records")
@RequiredArgsConstructor
@Slf4j
public class MedicalRecordController {
    private final AuthenticationService authenticationService;
    private final MedicalRecordService medicalRecordService;

    @PostMapping

    public ResponseEntity<ApiResponse<?>> addMedicalRecord(@Valid @RequestBody AddMedicalRecordRequest addMedicalRecordRequest) {

        MedicalRecord medicalRecord = MedicalRecord.builder()
                .memberID(addMedicalRecordRequest.getMemberID())
                .date(addMedicalRecordRequest.getDate())
                .doctor(addMedicalRecordRequest.getDoctor())
                .symptoms(addMedicalRecordRequest.getSymptoms())
                .diagnosis(addMedicalRecordRequest.getDiagnosis())
                .treatment(addMedicalRecordRequest.getTreatment())
                .facilityName(addMedicalRecordRequest.getFacilityName())
                .build();
        log.info(medicalRecord.toString());
        MedicalRecord createdMedicalRecord = medicalRecordService.addMedicalRecord(medicalRecord);
        ApiResponse<MedicalRecord> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Adding new medical record successfully",
                createdMedicalRecord
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateMedicalRecord(
            @PathVariable("id") Integer id,
            @Valid @RequestBody UpdateMedicalRecordRequest updateMedicalRecordRequest) {
        MedicalRecord medicalRecord = MedicalRecord.builder()
                .recordID(id)
                .memberID(updateMedicalRecordRequest.getMemberID())
                .date(updateMedicalRecordRequest.getDate())
                .doctor(updateMedicalRecordRequest.getDoctor())
                .symptoms(updateMedicalRecordRequest.getSymptoms())
                .diagnosis(updateMedicalRecordRequest.getDiagnosis())
                .treatment(updateMedicalRecordRequest.getTreatment())
                .facilityName(updateMedicalRecordRequest.getFacilityName())
                .build();
        MedicalRecord updatedMedicalRecord = medicalRecordService.updateMedicalRecord(medicalRecord);
        ApiResponse<MedicalRecord> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Update medical record successfully",
                updatedMedicalRecord
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicalRecord(@PathVariable("id") Integer id) {
        medicalRecordService.deleteMedicalRecord(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> getMedicalRecordById(@PathVariable("id") Integer id) {
        Optional<MedicalRecord> medicalRecord = medicalRecordService.findMedicalRecordById(id);
        ApiResponse<Optional<MedicalRecord>> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Get medical record successfully",
                medicalRecord
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<ApiResponse<List<MedicalRecord>>> getAllMedicalRecords(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "8") int size,
            @RequestParam(defaultValue = "") String keyword) {
        User user = authenticationService.getCurrentUser();
        Page<MedicalRecord> medicalRecordsPage = medicalRecordService.getAllMedicalRecords(page,size,keyword,user.getId());
        List<MedicalRecord> medicalRecords = medicalRecordsPage.getContent();
        ApiResponse<List<MedicalRecord>> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Get list of medical record successfully",
                medicalRecords
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
