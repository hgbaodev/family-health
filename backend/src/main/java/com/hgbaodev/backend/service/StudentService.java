package com.hgbaodev.backend.service;

import com.hgbaodev.backend.dto.StudentLocation;
import com.hgbaodev.backend.model.Student;

public interface StudentService {

    StudentLocation getStudentLocation(Long id);

    Student getStudentById(Long id);

    Student createNewStudent(Student student);
}
