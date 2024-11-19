package com.hgbaodev.backend.service;

import com.hgbaodev.backend.dto.request.allergy.AddAllergyRequest;
import com.hgbaodev.backend.dto.response.AllergyResponse;
import com.hgbaodev.backend.model.Allergy;
import com.hgbaodev.backend.utils.CustomPagination;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface AllergyService {
    Allergy addAllergy(AddAllergyRequest allergy);
    Allergy updateAllergy(Allergy allergy);
    void deleteAllergy(Integer allergyID);
    CustomPagination<AllergyResponse> getAllAllergies(int page, int size, String keyword, Integer userID, Long memberId);
    Optional <Allergy> findAllergyById(Integer allergyID);
}
