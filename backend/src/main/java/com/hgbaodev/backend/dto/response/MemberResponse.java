package com.hgbaodev.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponse {
    int id;
    UserDTO user;
    String fullName;
    LocalDate dateOfBirth;
    String gender;
    String relationship;
    String bloodType;
    float height;
    float weight;
}