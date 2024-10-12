    package com.hgbaodev.backend.controller;

    import com.hgbaodev.backend.model.Member;
    import com.hgbaodev.backend.model.User;
    import com.hgbaodev.backend.model.Vaccination;
    import com.hgbaodev.backend.request.member.AddMemberRequest;
    import com.hgbaodev.backend.request.member.UpdateMemberRequest;
    import com.hgbaodev.backend.request.vaccication.AddVaccinationRequest;
    import com.hgbaodev.backend.request.vaccication.UpdateVaccinationRequest;
    import com.hgbaodev.backend.response.ApiResponse;
    import com.hgbaodev.backend.service.AuthenticationService;
    import com.hgbaodev.backend.service.MemberService;
    import com.hgbaodev.backend.service.VaccinationService;
    import jakarta.validation.Valid;
    import lombok.RequiredArgsConstructor;
    import lombok.extern.slf4j.Slf4j;
    import org.springframework.data.domain.Page;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @RequestMapping("/api/v1/vaccinations")
    @RequiredArgsConstructor
    @Slf4j
    public class VaccicationController {

        private final VaccinationService vaccinationService;
        private final MemberService memberService;

        @PostMapping
        public ResponseEntity<ApiResponse<?>> addVaccination(@Valid @RequestBody AddVaccinationRequest addVaccinationRequest) {
            Member checkMember = memberService.getMemberById(addVaccinationRequest.getMemberID());
            if(checkMember == null) {
                ApiResponse<Member> response = new ApiResponse<>(
                        HttpStatus.NOT_FOUND.value(),
                        "Member not found",
                        null
                );
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
            Vaccination vaccination = Vaccination.builder()
                    .member(checkMember)
                    .vaccineName(addVaccinationRequest.getVaccineName())
                    .dateAdministered(addVaccinationRequest.getDateAdministered())
                    .build();
            Vaccination createdVaccination = vaccinationService.addVaccication(vaccination);
            ApiResponse<Vaccination> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Add vaccination successfully",
                    createdVaccination
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @PutMapping("/{id}")
        public ResponseEntity<ApiResponse<?>> updateVaccination(
                @PathVariable("id") Integer id,
                @Valid @RequestBody UpdateVaccinationRequest updateVaccinationRequest) {
            Member checkMember = memberService.getMemberById(updateVaccinationRequest.getMemberID());
            if(checkMember == null) {
                ApiResponse<Member> response = new ApiResponse<>(
                        HttpStatus.NOT_FOUND.value(),
                        "Member not found",
                        null
                );
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
            Vaccination vaccination = Vaccination.builder()
                    .vaccinationID(id)
                    .member(checkMember)
                    .vaccineName(updateVaccinationRequest.getVaccineName())
                    .dateAdministered(updateVaccinationRequest.getDateAdministered())
                    .build();
            Vaccination updatedVaccination = vaccinationService.updateVaccication(vaccination);
            ApiResponse<Vaccination> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Update vaccination successfully",
                    updatedVaccination
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteVaccination(@PathVariable("id") Integer id) {
            vaccinationService.deleteVaccication(id);
            return ResponseEntity.noContent().build();
        }

        @GetMapping("/{id}")
        public ResponseEntity<ApiResponse<?>> getMemberById(@PathVariable("id") Integer id) {
            Vaccination vaccination = vaccinationService.getVaccicationById(id);
            ApiResponse<Vaccination> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Get vaccination successfully",
                    vaccination
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @GetMapping
        public ResponseEntity<ApiResponse<List<Vaccination>>> getAllMembers(
                @RequestParam(defaultValue = "1") int page,
                @RequestParam(defaultValue = "8") int size,
                @RequestParam(defaultValue = "") String keyword) {
            Page<Vaccination> vaccinationPage = vaccinationService.getAllVaccications(page, size, keyword);

            List<Vaccination> vaccinationContent = vaccinationPage.getContent();

            ApiResponse<List<Vaccination>> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Get list vaccination successfully",
                    vaccinationContent
            );

            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }
