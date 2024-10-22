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
    @Query("SELECT m FROM Medication m WHERE LOWER(m.name) LIKE LOWER(CONCAT('%', :keyword, '%')) and m.recordID in"
            + "(SELECT mr.recordID from MedicalRecord mr join Member m on mr.memberID = m.memberID where m.userID = :userID)")
    Page<Medication> findByKeyword(@Param("keyword") String keyword, Pageable pageable,Integer userID);

    @Query("SELECT m FROM Medication m where m.recordID in"
            + "(SELECT mr.recordID from MedicalRecord mr join Member m on mr.memberID = m.memberID where m.userID = :userID)")
    Page<Medication> getAllByUserID(Pageable pageable,@Param("userID") Integer userID);
}
