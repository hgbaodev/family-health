package com.hgbaodev.backend.repository;

import com.hgbaodev.backend.model.Allergy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AllergyRepository extends JpaRepository<Allergy, Integer> {
    @Query("SELECT a FROM Allergy a WHERE " +
            "(LOWER(a.allergyType) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(a.severity) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(a.symptoms) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND a.member.user.id = :userID")
    Page<Allergy> findByKeyword(@Param("keyword") String keyword, Pageable pageable, @Param("userID") Integer userID);

    @Query("SELECT a FROM Allergy a WHERE " +
            "(LOWER(a.allergyType) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(a.severity) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(a.symptoms) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND a.member.memberID = :memberId " +
            "AND a.member.user.id = :userID")
    Page<Allergy> findByKeywordAndMember(@Param("memberId") Long memberId, @Param("keyword") String keyword, @Param("userID") Integer userID, Pageable pageable);

    @Query("SELECT a FROM Allergy a WHERE a.member.user.id = :userID")
    Page<Allergy> getAllergiesByUserID(@Param("userID") Integer userID, Pageable pageable);
}