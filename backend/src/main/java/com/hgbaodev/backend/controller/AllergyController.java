package com.hgbaodev.backend.controller;

import com.hgbaodev.backend.dto.response.AllergyResponse;
import com.hgbaodev.backend.mapper.AllergyMapper;
import com.hgbaodev.backend.model.Allergy;
import com.hgbaodev.backend.model.User;
import com.hgbaodev.backend.model.Member;
import com.hgbaodev.backend.repository.MemberRepository;
import com.hgbaodev.backend.dto.request.allergy.AddAllergyRequest;
import com.hgbaodev.backend.dto.request.allergy.UpdateAllergyRequest;
import com.hgbaodev.backend.dto.response.ApiResponse;
import com.hgbaodev.backend.service.AuthenticationService;
import com.hgbaodev.backend.service.AllergyService;
import com.hgbaodev.backend.utils.CustomPagination;
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
@RequestMapping("/api/v1/allergies")
@RequiredArgsConstructor
@Slf4j
public class AllergyController {
    private final AllergyService allergyService;
    private final AuthenticationService authenticationService;
    private final MemberRepository memberRepository;

    @PostMapping
    public ResponseEntity<ApiResponse<?>> addAllergy(@Valid @RequestBody AddAllergyRequest addAllergyRequest) {
        Member member = memberRepository.findById(addAllergyRequest.getMemberID())
                .orElseThrow(() -> new RuntimeException("Member not found"));
        addAllergyRequest.setMember(member);
        Allergy createdAllergy = allergyService.addAllergy(addAllergyRequest);
        ApiResponse<Allergy> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Adding new allergy successfully",
                createdAllergy
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateAllergy(
            @PathVariable("id") Integer id,
            @Valid @RequestBody UpdateAllergyRequest updateAllergyRequest) {
        Member member = memberRepository.findById(updateAllergyRequest.getMemberID())
                .orElseThrow(() -> new RuntimeException("Member not found"));
        Allergy allergy = Allergy.builder()
                .allergyID(id)
                .member(member)
                .allergyType(updateAllergyRequest.getAllergyType())
                .severity(updateAllergyRequest.getSeverity())
                .symptoms(updateAllergyRequest.getSymptoms())
                .build();
        Allergy updatedAllergy = allergyService.updateAllergy(allergy);
        ApiResponse<Allergy> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Update allergy successfully",
                updatedAllergy
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAllergy(@PathVariable("id") Integer id) {
        allergyService. deleteAllergy(id);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> getAllergyById(@PathVariable("id") Integer id) {
        Optional<Allergy> allergy = allergyService.findAllergyById(id);
        ApiResponse<Optional<Allergy>> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Get allergy successfully",
                allergy
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<ApiResponse<CustomPagination<AllergyResponse>>> getAllAllergies(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "8") int size,
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(required = false) Long memberId) {
        User user = authenticationService.getCurrentUser();
        CustomPagination<AllergyResponse> alleriesPage = allergyService.getAllAllergies(page,size,keyword, user.getId(), memberId);
        ApiResponse<CustomPagination<AllergyResponse>> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Get list of allergy successfully",
                alleriesPage
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
