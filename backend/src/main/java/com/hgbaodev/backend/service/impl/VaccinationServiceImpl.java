package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.model.Vaccication;
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
    public Vaccication addVaccication(Vaccication vaccination) {
        return vaccicationRepository.save(vaccination);
    }

    @Override
    public Vaccication updateVaccication(Vaccication vaccination) {
        Vaccication check = vaccicationRepository.findById(vaccination.getVaccinationID())
                .orElseThrow(() -> new IllegalArgumentException("Vaccication not found"));
        vaccination.setVaccinationID(check.getVaccinationID());
        return vaccicationRepository.save(vaccination);
    }

    @Override
    public void deleteVaccication(Integer vaccicationID) {
        vaccicationRepository.deleteById(vaccicationID);
    }

    @Override
    public Vaccication getVaccicationById(Integer vaccicationID) {
        return vaccicationRepository.findById(vaccicationID)
                .orElseThrow(() -> new IllegalArgumentException("Vaccication not found"));
    }

    @Override
    public Page<Vaccication> getAllVaccications(int page, int size, int userId, String keyword, Long memberId) {
        Pageable pageable = PageRequest.of(page - 1, size);
        if (memberId != null) {
            return vaccicationRepository.findByKeywordAndMember(memberId, keyword, userId, pageable);
        } else {
            return vaccicationRepository.findByKeyword(keyword, userId, pageable);
        }
    }

}
