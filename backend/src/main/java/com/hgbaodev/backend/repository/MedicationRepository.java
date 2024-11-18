package com.hgbaodev.backend.repository;

import com.hgbaodev.backend.model.Medication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicationRepository extends JpaRepository<Medication, Integer> {
    @Query("SELECT m FROM Medication m WHERE LOWER(m.name) LIKE LOWER(CONCAT('%', :keyword, '%')) AND m.recordID IN " +
            "(SELECT mr.recordID FROM MedicalRecord mr JOIN mr.member mem WHERE mem.user.id = :userID)")
    Page<Medication> findByKeyword(@Param("keyword") String keyword, Pageable pageable, @Param("userID") Integer userID);

    @Query("SELECT m FROM Medication m WHERE m.recordID IN " +
            "(SELECT mr.recordID FROM MedicalRecord mr JOIN mr.member mem WHERE mem.user.id = :userID)")
    Page<Medication> getAllByUserID(Pageable pageable, @Param("userID") Integer userID);
}