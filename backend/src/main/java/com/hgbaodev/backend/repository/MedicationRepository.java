package com.hgbaodev.backend.repository;

import com.hgbaodev.backend.model.Medication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicationRepository extends JpaRepository<Medication, Integer> {
    void deleteByMedicalRecordId(Integer medicalRecordId);
}