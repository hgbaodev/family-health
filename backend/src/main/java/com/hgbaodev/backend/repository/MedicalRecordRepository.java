package com.hgbaodev.backend.repository;

import com.hgbaodev.backend.model.MedicalRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Integer> {
    @Query("SELECT mr FROM MedicalRecord mr WHERE LOWER(mr.doctor) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "AND mr.memberID IN (SELECT m.memberID FROM Member m WHERE m.userID = :userID)")
    Page<MedicalRecord> findByKeyword(@Param("keyword") String keyword, Integer userID, Pageable pageable);

    @Query("SELECT mr FROM MedicalRecord mr " +
            "WHERE mr.memberID IN (SELECT m.memberID FROM Member m WHERE m.userID = :userID)")
    Page<MedicalRecord> findAllByUserID(Pageable pageable, @Param("userID") Integer userID);
}
