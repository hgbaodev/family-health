package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.dto.StudentLocation;
import com.hgbaodev.backend.exception.ResourceNotFoundException;
import com.hgbaodev.backend.model.Student;
import com.hgbaodev.backend.repository.StudentRepository;
import com.hgbaodev.backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public StudentLocation getStudentLocation(Long id) {
        Optional<StudentLocation> studentLocation = studentRepository.findStudentLocationById(id);
        if (!studentLocation.isPresent()) {
            throw new ResourceNotFoundException("Student Location", "id", id.toString());
        }
        return studentLocation.get();
    }

    @Override
    public Student getStudentById(Long id) {
        Optional<Student> student = studentRepository.findById(id);
        if (!student.isPresent()) {
            throw new ResourceNotFoundException("Student", "id", id.toString());
        }
        return student.get();
    }

    @Override
    public Student createNewStudent(Student student) {
        try {
            return studentRepository.save(student);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
