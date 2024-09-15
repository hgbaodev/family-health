package com.hgbaodev.backend.controller;

import com.hgbaodev.backend.model.Student;
import com.hgbaodev.backend.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Validated
@RequestMapping(value = "/api/v1/student", produces = "application/json")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping(value = "/new")
    public ResponseEntity<Student> createNewStudent(@Valid @RequestBody Student student) {
        return new ResponseEntity<>(studentService.createNewStudent(student), HttpStatus.CREATED);
    }

    @GetMapping(value = "/{studentId}")
    public ResponseEntity<Student> getStudentById(@PathVariable("studentId") Long studentId) {
        return new ResponseEntity<>(studentService.getStudentById(studentId), HttpStatus.OK);
    }
}
