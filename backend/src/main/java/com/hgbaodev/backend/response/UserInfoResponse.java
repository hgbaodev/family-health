package com.hgbaodev.backend.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoResponse {
    private String lastname;
    private String firstname;
    private String phoneNumber;

    @JsonProperty("email")
    private String email;

}
