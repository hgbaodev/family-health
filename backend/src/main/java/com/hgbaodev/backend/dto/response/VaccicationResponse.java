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
public class VaccicationResponse {
    int id;
    MemberDTO member;
    String vaccineName;
    Date dateAdministered;
}
