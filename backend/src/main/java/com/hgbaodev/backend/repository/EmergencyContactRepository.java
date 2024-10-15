package com.hgbaodev.backend.repository;

import com.hgbaodev.backend.model.EmergencyContact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmergencyContactRepository extends JpaRepository<EmergencyContact, Integer> {
    @Query("SELECT e FROM EmergencyContact e WHERE LOWER(e.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<EmergencyContact> findByKeyword(@Param("keyword") String keyword, Pageable pageable);

}
