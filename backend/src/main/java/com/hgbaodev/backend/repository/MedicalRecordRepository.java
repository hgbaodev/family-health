package com.hgbaodev.backend.repository;

import com.hgbaodev.backend.model.MedicalRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Integer> {
    @Query("SELECT mr FROM MedicalRecord mr WHERE " +
            "(LOWER(mr.doctor) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(mr.diagnosis) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(mr.symptoms) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(mr.facilityName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(mr.treatment) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND mr.deletedAt IS NULL " +
            "AND mr.member.user.id = :userId")
    Page<MedicalRecord> findByKeyword(@Param("keyword") String keyword, @Param("userId") Integer userId, Pageable pageable);

    @Query("SELECT mr FROM MedicalRecord mr WHERE " +
            "(LOWER(mr.doctor) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(mr.diagnosis) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(mr.symptoms) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(mr.facilityName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(mr.treatment) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND mr.deletedAt IS NULL " +
            "AND mr.member.id = :memberId " +
            "AND mr.member.user.id = :userId")
    Page<MedicalRecord> findByKeywordAndMemberId(@Param("keyword") String keyword, @Param("userId") Integer userId, @Param("memberId") Long memberId,Pageable pageable);
}