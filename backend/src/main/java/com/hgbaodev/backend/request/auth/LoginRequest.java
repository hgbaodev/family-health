package com.hgbaodev.backend.request.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LoginRequest {

  @NotNull(message = "Email is required")
  @Email(message = "Email should be valid")
  private String email;

  @NotNull(message = "Password is required")
  String password;
}
