package com.hgbaodev.backend.service;

import com.hgbaodev.backend.request.auth.RegisterRequest;
import com.hgbaodev.backend.request.auth.LoginRequest;
import com.hgbaodev.backend.model.User;
import com.hgbaodev.backend.response.ApiResponse;
import com.hgbaodev.backend.response.AuthenticationResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

public interface AuthenticationService {

  AuthenticationResponse register(RegisterRequest request);

  AuthenticationResponse authenticate(LoginRequest request);

  void saveUserToken(User user, String jwtToken);

  void revokeAllUserTokens(User user);

  ResponseEntity<ApiResponse<?>> refreshToken(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException;

  ResponseEntity<ApiResponse<?>> getMe(
          HttpServletRequest request,
          HttpServletResponse response
  ) throws IOException;

  public User getCurrentUser();
}
