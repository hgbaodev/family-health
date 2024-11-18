package com.hgbaodev.backend.dto.response.member;

import com.hgbaodev.backend.model.User;
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
    private int memberID;
    UserResponse user;
    String fullName;
    LocalDate dateOfBirth;
    String gender;
    String relationship;
    String bloodType;
    float height;
    float weight;
}