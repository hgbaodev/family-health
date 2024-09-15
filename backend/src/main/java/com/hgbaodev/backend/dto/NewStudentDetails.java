package com.hgbaodev.backend.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class NewStudentDetails {
    private String name;
    private String email;
    private LocalDate birthDate;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String zip;
    private String country;
}