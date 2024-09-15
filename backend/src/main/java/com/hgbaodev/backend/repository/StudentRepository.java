package com.hgbaodev.backend.repository;

import com.hgbaodev.backend.dto.StudentLocation;
import com.hgbaodev.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query("SELECT new com.hgbaodev.backend.dto.StudentLocation(s.id, s.address, s.city, s.state, s.zip, s.country) FROM Student s WHERE s.id = ?1")
    Optional<StudentLocation> findStudentLocationById(Long id);

}

