package com.hgbaodev.backend.repository;

import com.hgbaodev.backend.model.Vaccination;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VaccicationRepository extends JpaRepository<Vaccination, Integer> {
    @Query("SELECT m FROM Vaccination m WHERE LOWER(m.vaccineName) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<Vaccination> findByKeyword(@Param("keyword") String keyword, Pageable pageable);
}
