package com.hgbaodev.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AllergyResponse {
    int allergyID;
    MemberDTO member;
    String allergyType;
    String severity;
    String symptoms;
}
