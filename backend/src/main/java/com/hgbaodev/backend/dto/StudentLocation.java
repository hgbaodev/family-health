package com.hgbaodev.backend.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class StudentLocation {
    Long id;
    private String address;
    private String city;
    private String state;
    private String zip;
    private String country;
}
