package com.hgbaodev.backend.repository;

import com.hgbaodev.backend.model.MedicalRecord;
import com.hgbaodev.backend.model.Medication;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicationRepository extends JpaRepository<Medication, Integer> {
}
