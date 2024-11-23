package com.hgbaodev.backend.controller;


import com.hgbaodev.backend.dto.response.MedicalRecordResponse;
import com.hgbaodev.backend.model.MedicalRecord;
import com.hgbaodev.backend.model.Member;
import com.hgbaodev.backend.model.User;
import com.hgbaodev.backend.dto.request.medicalRecord.UpdateMedicalRecordRequest;
import com.hgbaodev.backend.dto.request.medicalRecord.AddMedicalRecordRequest;
import com.hgbaodev.backend.dto.response.ApiResponse;
import com.hgbaodev.backend.service.AuthenticationService;
import com.hgbaodev.backend.service.MedicalRecordService;
import com.hgbaodev.backend.service.MemberService;
import com.hgbaodev.backend.utils.CustomPagination;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/medical-records")
@RequiredArgsConstructor
@Slf4j
public class MedicalRecordController {
    private final AuthenticationService authenticationService;
    private final MedicalRecordService medicalRecordService;
    private final MemberService memberService;


    @PostMapping
    public ResponseEntity<ApiResponse<?>> addMedicalRecord(
            @Valid @RequestBody AddMedicalRecordRequest addMedicalRecordRequest) {
        MedicalRecord medicalRecord = medicalRecordService.addMedicalRecord(addMedicalRecordRequest);
        ApiResponse<MedicalRecord> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Adding new medical record successfully",
                medicalRecord
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateMedicalRecord(
            @PathVariable("id") Integer id,
            @Valid @RequestBody UpdateMedicalRecordRequest updateMedicalRecordRequest) {
        Member member = memberService.getMemberById(updateMedicalRecordRequest.getMemberId());
        MedicalRecord medicalRecord = MedicalRecord.builder()
                .id(id)
                .member(member)
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
    public ResponseEntity<ApiResponse<?>> getAllMedicalRecords(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "8") int size,
            @RequestParam(defaultValue = "") String keyword) {
        User user = authenticationService.getCurrentUser();
        CustomPagination<MedicalRecordResponse> medicalRecordsPage = medicalRecordService.getAllMedicalRecords(page,size,keyword,user.getId());
        ApiResponse<CustomPagination<MedicalRecordResponse>> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Get list of medical record successfully",
                medicalRecordsPage
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
