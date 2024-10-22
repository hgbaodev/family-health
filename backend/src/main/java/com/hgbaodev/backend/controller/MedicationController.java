    package com.hgbaodev.backend.controller;

    import com.hgbaodev.backend.model.Medication;
    import com.hgbaodev.backend.model.User;
    import com.hgbaodev.backend.request.medication.AddMedicationRequest;
    import com.hgbaodev.backend.request.medication.UpdateMedicationRequest;
    import com.hgbaodev.backend.response.ApiResponse;
    import com.hgbaodev.backend.service.AuthenticationService;
    import com.hgbaodev.backend.service.MedicationService;
    import jakarta.validation.Valid;
    import lombok.RequiredArgsConstructor;
    import lombok.extern.slf4j.Slf4j;
    import org.springframework.data.domain.Page;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @RequestMapping("/api/v1/medications")
    @RequiredArgsConstructor
    @Slf4j
    public class MedicationController {

        private final MedicationService medicationService;
        private final AuthenticationService authenticationService;

        @PostMapping
        public ResponseEntity<ApiResponse<?>> addMedication(@Valid @RequestBody AddMedicationRequest addMedicationRequest) {
//          Lấy recordID từ record được chọn
            Medication medication = Medication.builder()
                    .recordID(addMedicationRequest.getRecordID())
                    .name(addMedicationRequest.getName())
                    .frequency(addMedicationRequest.getFrequency())
                    .startDate(addMedicationRequest.getStartDate())
                    .endDate(addMedicationRequest.getEndDate())
                    .note(addMedicationRequest.getNote())
                    .build();
            Medication createdMedication = medicationService.addMedication(medication);
            ApiResponse<Medication> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Get list medication successfully",
                    createdMedication
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @PutMapping("/{id}")
        public ResponseEntity<ApiResponse<?>> updateMedication(
                @PathVariable("id") Integer id,
                @Valid @RequestBody UpdateMedicationRequest updateMedicationRequest) {
            Medication medication = Medication.builder()
                    .medicationID(id)
                    .name(updateMedicationRequest.getName())
                    .frequency(updateMedicationRequest.getFrequency())
                    .startDate(updateMedicationRequest.getStartDate())
                    .endDate(updateMedicationRequest.getEndDate())
                    .note(updateMedicationRequest.getNote())
                    .build();
            Medication updatedMedication = medicationService.updateMedication(medication);
            ApiResponse<Medication> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Update medication successfully",
                    updatedMedication
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteMedication(@PathVariable("id") Integer id) {
            medicationService.deleteMedication(id);
            return ResponseEntity.noContent().build();
        }

        @GetMapping("/{id}")
        public ResponseEntity<ApiResponse<?>> getMemberById(@PathVariable("id") Integer id) {
            Medication medication = medicationService.getMedicationById(id);
            ApiResponse<Medication> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Get medication successfully",
                    medication
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @GetMapping
        public ResponseEntity<ApiResponse<List<Medication>>> getAllMembers(
                @RequestParam(defaultValue = "1") int page,
                @RequestParam(defaultValue = "8") int size,
                @RequestParam(defaultValue = "") String keyword) {
            User user = authenticationService.getCurrentUser();
            Page<Medication> medicationsPage = medicationService.getAllMedications(page, size, keyword, user.getId());

            List<Medication> medicationsContent = medicationsPage.getContent();

            ApiResponse<List<Medication>> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Get list medication successfully",
                    medicationsContent
            );

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }
