package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.model.Vaccination;
import com.hgbaodev.backend.repository.VaccicationRepository;
import com.hgbaodev.backend.service.VaccinationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class VaccinationServiceImpl implements VaccinationService {

    private final VaccicationRepository vaccicationRepository;

    @Override
    public Vaccination addVaccication(Vaccination vaccination) {
        return vaccicationRepository.save(vaccination);
    }

    @Override
    public Vaccination updateVaccication(Vaccination vaccination) {
        Vaccination check = vaccicationRepository.findById(vaccination.getVaccinationID())
                .orElseThrow(() -> new IllegalArgumentException("Vaccication not found"));
        vaccination.setVaccinationID(check.getVaccinationID());
        return vaccicationRepository.save(vaccination);
    }

    @Override
    public void deleteVaccication(Integer vaccicationID) {
        vaccicationRepository.deleteById(vaccicationID);
    }

    @Override
    public Vaccination getVaccicationById(Integer vaccicationID) {
        return vaccicationRepository.findById(vaccicationID)
                .orElseThrow(() -> new IllegalArgumentException("Vaccication not found"));
    }

    @Override
    public Page<Vaccination> getAllVaccications(int page, int size, String keyword) {
        Pageable pageable = PageRequest.of(page - 1, size);
        if (keyword != null && !keyword.isEmpty()) {
            return vaccicationRepository.findByKeyword(keyword, pageable);
        }
        return vaccicationRepository.findAll(pageable);
    }

}
