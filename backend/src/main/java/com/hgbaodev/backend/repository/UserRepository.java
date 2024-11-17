package com.hgbaodev.backend.repository;

import com.hgbaodev.backend.model.Medication;
import com.hgbaodev.backend.model.Member;
import com.hgbaodev.backend.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
  @Query("SELECT u FROM User u " +
          "WHERE u.email <> 'admin@mail.com' " +
          "AND (LOWER(u.firstname) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
          "OR LOWER(u.lastname) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
          "OR LOWER(u.email) LIKE LOWER(CONCAT('%', :keyword, '%')))")
  Page<User> findByKeyword(@Param("keyword") String keyword, Pageable pageable);

  @Query("SELECT u FROM User u " +
          "WHERE u.email <> 'admin@mail.com' ")
  Page<User> findAll(Pageable pageable);

  Optional<User> findByEmail(String email);
  boolean existsByEmail(String email);
}
