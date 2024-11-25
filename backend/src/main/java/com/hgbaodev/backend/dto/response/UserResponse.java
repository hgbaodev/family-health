package com.hgbaodev.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hgbaodev.backend.enums.Role;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    String firstname;
    String lastname;

    @JsonProperty("email")
    String email;

    Role role;
}
