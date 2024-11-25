package com.hgbaodev.backend.controller;

import com.google.api.client.util.DateTime;
import com.hgbaodev.backend.enums.Role;
import com.hgbaodev.backend.dto.request.auth.LoginRequest;
import com.hgbaodev.backend.dto.request.auth.NewPasswordRequest;
import com.hgbaodev.backend.dto.request.auth.OTPRequest;
import com.hgbaodev.backend.dto.response.ApiResponse;
import com.hgbaodev.backend.dto.response.AuthenticationResponse;
import com.hgbaodev.backend.service.AuthenticationService;
import com.hgbaodev.backend.dto.request.auth.RegisterRequest;
import com.hgbaodev.backend.service.ForgotPasswordService;
import com.hgbaodev.backend.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;
  private final ForgotPasswordService forgotPasswordService;

  @PostMapping("/register")
  public ResponseEntity<ApiResponse<AuthenticationResponse>> register(
          @Valid @RequestBody RegisterRequest request
  ) {
    request.setRole(Role.USER);
    request.setDate(LocalDateTime.now());
    AuthenticationResponse authResponse = service.register(request);
    ApiResponse<AuthenticationResponse> response = new ApiResponse<>(
            HttpStatus.OK.value(),
            "Register successful",
            authResponse
    );
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @PostMapping("/login")
  public ResponseEntity<ApiResponse<AuthenticationResponse>> authenticate(
      @Valid @RequestBody LoginRequest request
  ) {
    AuthenticationResponse authResponse = service.authenticate(request);
    ApiResponse<AuthenticationResponse> response = new ApiResponse<>(
            HttpStatus.OK.value(),
            "Login successful",
            authResponse
    );
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @GetMapping("/login")
  public ResponseEntity<ApiResponse<String>> authenticateWithUsername(
          @RequestParam("username") String username
  ) {
    service.verifyEmail(username);

    ApiResponse<String> response = new ApiResponse<>(
            HttpStatus.OK.value(),
            "Username authentication successful",
            ""
    );
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @PostMapping("/refresh-token")
  public ResponseEntity<ApiResponse<?>> refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException {
    return service.refreshToken(request, response);
  }

  @GetMapping("/me")
  public ResponseEntity<ApiResponse<?>> me(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException {
    return service.getMe(request, response);
  }

  @PostMapping("/forgot-password")
  public ResponseEntity<ApiResponse<String>> sendOTP(@Valid @RequestBody OTPRequest request) {
    String result = forgotPasswordService.sendOTP(request.getEmail());
    ApiResponse<String> response = new ApiResponse<>(
            HttpStatus.OK.value(),
            "Register successful",
            result
    );
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @PostMapping("/otp")
  public ResponseEntity<ApiResponse<String>> sendNewPassword(@Valid @RequestBody NewPasswordRequest request) {
    String result = forgotPasswordService.sendNewPassword(request.getEmail(), request.getOtp());

    if (result == null) {
      return new ResponseEntity<>(new ApiResponse<>(
              HttpStatus.FORBIDDEN.value(),
              "OTP invalid",
              null
      ), HttpStatus.FORBIDDEN);
    }

    return new ResponseEntity<>(new ApiResponse<>(
            HttpStatus.OK.value(),
            "New password has been sent to your email.",
            result
    ), HttpStatus.OK);
  }
}
