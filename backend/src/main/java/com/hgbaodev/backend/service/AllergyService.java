package com.hgbaodev.backend.service;

import com.hgbaodev.backend.model.Allergy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface AllergyService {
    //CRUD
    Allergy addAllergy(Allergy allergy);
    Allergy updateAllergy(Allergy allergy);
    void deleteAllergy(Integer allergyID);
    Page<Allergy> getAllAllergies(int page, int size,String keyword,Integer userID);
    //Search
    Optional <Allergy> findAllergyById(Integer allergyID);
}
