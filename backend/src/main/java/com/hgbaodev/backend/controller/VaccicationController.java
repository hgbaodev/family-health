    package com.hgbaodev.backend.controller;

    import com.hgbaodev.backend.dto.response.VaccicationResponse;
    import com.hgbaodev.backend.mapper.VaccicationMapper;
    import com.hgbaodev.backend.model.Member;
    import com.hgbaodev.backend.model.User;
    import com.hgbaodev.backend.model.Vaccication;
    import com.hgbaodev.backend.dto.request.vaccication.AddVaccinationRequest;
    import com.hgbaodev.backend.dto.request.vaccication.UpdateVaccinationRequest;
    import com.hgbaodev.backend.dto.response.ApiResponse;
    import com.hgbaodev.backend.service.AuthenticationService;
    import com.hgbaodev.backend.service.MemberService;
    import com.hgbaodev.backend.service.VaccinationService;
    import com.hgbaodev.backend.utils.CustomPagination;
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
        private final AuthenticationService authenticationService;
        private final MemberService memberService;
        private final VaccicationMapper vaccinationMapper;

        @PostMapping
        public ResponseEntity<ApiResponse<?>> addVaccination(@Valid @RequestBody AddVaccinationRequest addVaccinationRequest) {
            Member checkMember = memberService.getMemberById(addVaccinationRequest.getMemberId());
            if(checkMember == null) {
                ApiResponse<Member> response = new ApiResponse<>(
                        HttpStatus.NOT_FOUND.value(),
                        "Member not found",
                        null
                );
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
            Vaccication vaccination = Vaccication.builder()
                    .member(checkMember)
                    .vaccineName(addVaccinationRequest.getVaccineName())
                    .dateAdministered(addVaccinationRequest.getDateAdministered())
                    .build();
            Vaccication createdVaccination = vaccinationService.addVaccication(vaccination);
            ApiResponse<Vaccication> response = new ApiResponse<>(
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
            Member checkMember = memberService.getMemberById(updateVaccinationRequest.getMemberId());
            if(checkMember == null) {
                ApiResponse<Member> response = new ApiResponse<>(
                        HttpStatus.NOT_FOUND.value(),
                        "Member not found",
                        null
                );
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
            Vaccication vaccination = Vaccication.builder()
                    .id(id)
                    .member(checkMember)
                    .vaccineName(updateVaccinationRequest.getVaccineName())
                    .dateAdministered(updateVaccinationRequest.getDateAdministered())
                    .build();
            Vaccication updatedVaccination = vaccinationService.updateVaccication(vaccination);
            ApiResponse<Vaccication> response = new ApiResponse<>(
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
            Vaccication vaccination = vaccinationService.getVaccicationById(id);
            ApiResponse<Vaccication> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Get vaccination successfully",
                    vaccination
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @GetMapping
        public ResponseEntity<ApiResponse<CustomPagination<VaccicationResponse>>> getVaccications(
                @RequestParam(defaultValue = "1") int page,
                @RequestParam(defaultValue = "8") int size,
                @RequestParam(defaultValue = "") String keyword,
                @RequestParam(required = false) Long memberId) {
            User user = authenticationService.getCurrentUser();
            Page<Vaccication> vaccicationPage = vaccinationService.getAllVaccications(page, size, user.getId() ,keyword, memberId);
            Page<VaccicationResponse> vaccicationResponsePage = vaccicationPage.map(vaccinationMapper::toVaccicationResponse);
            CustomPagination<VaccicationResponse> vaccinationContent = new CustomPagination<>(vaccicationResponsePage);
            ApiResponse<CustomPagination<VaccicationResponse>> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Get list vaccination successfully",
                    vaccinationContent
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }
    }
