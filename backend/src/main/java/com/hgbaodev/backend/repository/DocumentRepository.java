package com.hgbaodev.backend.repository;

import com.hgbaodev.backend.model.Document;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DocumentRepository extends JpaRepository<Document, Integer> {
    @Query("SELECT d FROM Document d WHERE d.fileName LIKE LOWER(CONCAT('%', :keyword, '%')) AND d.record.member.user.id = :userId")
    Page<Document> findByKeyword(@Param("keyword") String keyword, Pageable pageable, @Param("userId") Integer userId);

    @Query("SELECT d FROM Document d WHERE d.record.member.user.id = :userId")
    Page<Document> getAllBaseOnUserID(Pageable pageable, @Param("userId") Integer userId);
}