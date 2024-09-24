package com.hgbaodev.backend.controller;

import com.hgbaodev.backend.request.auth.LoginRequest;
import com.hgbaodev.backend.response.ApiResponse;
import com.hgbaodev.backend.response.AuthenticationResponse;
import com.hgbaodev.backend.service.AuthenticationService;
import com.hgbaodev.backend.request.auth.RegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;

  @PostMapping("/register")
  public ResponseEntity<ApiResponse<AuthenticationResponse>> register(
          @Valid @RequestBody RegisterRequest request
  ) {
    AuthenticationResponse authResponse = service.register(request);
    ApiResponse<AuthenticationResponse> response = new ApiResponse<>(
            HttpStatus.OK.value(),
            "Login successful",
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

}
