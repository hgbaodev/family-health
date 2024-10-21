package com.hgbaodev.backend.repository;

import com.hgbaodev.backend.model.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DocumentRepository extends JpaRepository<Document, Integer> {
    @Query("SELECT d FROM Document d WHERE d.fileName LIKE LOWER(CONCAT('%', :keyword, '%')) AND d.recordID IN (" +
            "SELECT mr.recordID FROM MedicalRecord mr " +
            "JOIN Member m ON mr.memberID = m.memberID " +
            "JOIN User u ON m.userID = u.id " +
            "WHERE u.id = :userID)")
    Page<Document> findByKeyword(@Param("keyword") String keyword, Pageable pageable,Integer userID);

    @Query("SELECT d FROM Document d WHERE d.recordID IN (" +
            "SELECT mr.recordID FROM MedicalRecord mr " +
            "JOIN Member m ON mr.memberID = m.memberID " +
            "JOIN User u ON m.userID = u.id " +
            "WHERE u.id = :userID)")
    Page<Document> getAllBaseOnUserID(Pageable pageable, @Param("userID") Integer userID);
}
