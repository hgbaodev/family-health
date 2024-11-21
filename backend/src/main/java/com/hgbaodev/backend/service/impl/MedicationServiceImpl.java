package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.model.Medication;
import com.hgbaodev.backend.model.Member;
import com.hgbaodev.backend.repository.MedicationRepository;
import com.hgbaodev.backend.repository.MemberRepository;
import com.hgbaodev.backend.service.MedicationService;
import com.hgbaodev.backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MedicationServiceImpl implements MedicationService {

    private final MedicationRepository medicationRepository;

    @Override
    public Medication addMedication(Medication medication) {
        return medicationRepository.save(medication);
    }

    @Override
    public Medication updateMedication(Medication medication) {
        Medication check = medicationRepository.findById(medication.getId())
                .orElseThrow(() -> new IllegalArgumentException("Medication not found"));
        medication.setId(check.getId());
        return medicationRepository.save(medication);
    }

    @Override
    public void deleteMedication(Integer medicationID) {
        medicationRepository.deleteById(medicationID);
    }

    @Override
    public Medication getMedicationById(Integer medicationID) {
        return medicationRepository.findById(medicationID)
                .orElseThrow(() -> new IllegalArgumentException("Medication not found"));
    }

    @Override
    public Page<Medication> getAllMedications(int page, int size, String keyword,Integer userID) {
        Pageable pageable = PageRequest.of(page - 1, size);
        if (keyword != null && !keyword.isEmpty()) {
            return medicationRepository.findByKeyword(keyword, pageable,userID);
        }
        return medicationRepository.getAllByUserID(pageable,userID);
    }

}
