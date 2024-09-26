package com.hgbaodev.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Student name is required")
    private String name;

    @NotNull(message = "Student email is required")
    @Email(message = "Invalid email address")
    private String email;

    @NotNull(message = "Student birth date is required")
    private LocalDate birthDate;

    private String phone;

    private String address;

    private String city;

    private String state;

    private String zip;

    private String country;
}
