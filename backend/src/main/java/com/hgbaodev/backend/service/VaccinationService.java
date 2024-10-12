package com.hgbaodev.backend.service;

import com.hgbaodev.backend.model.Vaccination;
import org.springframework.data.domain.Page;


public interface VaccinationService {
    Vaccination addVaccication(Vaccination member);
    Vaccination updateVaccication(Vaccination member);
    void deleteVaccication(Integer memberID);
    Vaccination getVaccicationById(Integer memberID);
    Page<Vaccination> getAllVaccications(int page, int size, String keyword);
}
