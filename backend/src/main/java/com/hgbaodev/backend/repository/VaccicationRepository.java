package com.hgbaodev.backend.repository;

import com.hgbaodev.backend.model.Vaccication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VaccicationRepository extends JpaRepository<Vaccication, Integer> {
    @Query("SELECT m FROM Vaccication m WHERE LOWER(m.vaccineName) LIKE LOWER(CONCAT('%', :keyword, '%')) AND m.member.user.id = :userId")
    Page<Vaccication> findByKeyword(@Param("keyword") String keyword, @Param("userId") int userId, Pageable pageable);

    @Query("SELECT m FROM Vaccication m WHERE m.member.memberID = :memberId AND LOWER(m.vaccineName) LIKE LOWER(CONCAT('%', :keyword, '%')) AND m.member.user.id = :userId")
    Page<Vaccication> findByKeywordAndMember(@Param("memberId") Long memberId, @Param("keyword") String keyword, @Param("userId") int userId, Pageable pageable);
}
