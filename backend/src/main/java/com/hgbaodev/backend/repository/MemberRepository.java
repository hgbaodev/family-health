package com.hgbaodev.backend.repository;

import com.hgbaodev.backend.model.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    @Query("SELECT m FROM Member m WHERE LOWER(m.fullName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Member> findByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
