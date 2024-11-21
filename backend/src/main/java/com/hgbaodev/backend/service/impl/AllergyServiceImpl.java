package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.dto.request.allergy.AddAllergyRequest;
import com.hgbaodev.backend.dto.response.AllergyResponse;
import com.hgbaodev.backend.mapper.AllergyMapper;
import com.hgbaodev.backend.model.Allergy;
import com.hgbaodev.backend.repository.AllergyRepository;
import com.hgbaodev.backend.service.AllergyService;
import com.hgbaodev.backend.utils.CustomPagination;
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
public class AllergyServiceImpl implements AllergyService {
    private final AllergyRepository allergyRepository;

    @Override
    public Allergy addAllergy(AddAllergyRequest addAllergyRequest) {
        Allergy allergy = AllergyMapper.INSTANCE.convectToAllergy(addAllergyRequest);
        return allergyRepository.save(allergy);
    }

    @Override
    public Allergy updateAllergy(Allergy allergy) {
        Allergy check = allergyRepository.findById(allergy.getId())
                .orElseThrow(() -> new IllegalArgumentException("Allergy not found "));
        return allergyRepository.save(allergy);
    }

    @Override
    public void deleteAllergy(Integer allergyID){
        Allergy check = allergyRepository.findById(allergyID)
                .orElseThrow(() -> new IllegalArgumentException("Allergy not found"));
        allergyRepository.deleteById(check.getId());
    }

    @Override
    public CustomPagination<AllergyResponse> getAllAllergies(int page, int size, String keyword, Integer userID, Long memberId) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<Allergy> allergies;
        if(memberId != null){
            allergies = allergyRepository.findByKeywordAndMember(memberId, keyword, userID, pageable);
        } else {
            allergies = allergyRepository.findByKeyword(keyword, pageable, userID);
        }
        Page<AllergyResponse> allergyResponses = allergies.map(AllergyMapper.INSTANCE::toAllergyResponse);
        CustomPagination<AllergyResponse> allergyContent = new CustomPagination<>(allergyResponses);
        return allergyContent;
    }

    @Override
    public Optional<Allergy> findAllergyById(Integer allergyID){
        return allergyRepository.findById(allergyID);
    }
//    @Override
//    public Page<Allergy> findBySeverity(String severity,Pageable pageable){
//        return allergyRepository.findBySeverity(severity, pageable);
//    }
//    @Override
//    public Page<Allergy> findByAllergyType(String allergyType,Pageable pageable){
//        return allergyRepository.findByAllergyType(allergyType, pageable);
//    }
}
