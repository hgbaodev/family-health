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
    @Query("SELECT m FROM Medication m WHERE LOWER(m.name) LIKE LOWER(CONCAT('%', :keyword, '%')) AND m.record.member.user.id = :userId")
    Page<Medication> findByKeyword(@Param("keyword") String keyword, Pageable pageable, @Param("userId") Integer userId);

    @Query("SELECT m FROM Medication m WHERE m.record.member.user.id = :userId")
    Page<Medication> getAllByUserID(Pageable pageable, @Param("userId") Integer userId);
}