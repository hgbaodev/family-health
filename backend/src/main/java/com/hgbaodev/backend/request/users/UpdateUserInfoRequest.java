package com.hgbaodev.backend.request.users;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserInfoRequest {
    @NotBlank(message = "Firstname is required")
    @Size(max = 100, message = "First name must not exceed 100 characters")
    private String firstname;


    @NotBlank(message = "Lastname is required")
    @Size(max = 100, message = "First name must not exceed 100 characters")
    private String lastname;

    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    private String phoneNumber;
}
