package com.hgbaodev.backend.controller;

import com.hgbaodev.backend.dto.request.google.GoogleLoginRequest;
import com.hgbaodev.backend.dto.response.ApiResponse;
import com.hgbaodev.backend.dto.response.AuthenticationResponse;
import com.hgbaodev.backend.service.OAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/oauth2")
@Slf4j
@RequiredArgsConstructor
public class OAuth2Controller {
    private final OAuthService oauthService;
    @PostMapping("/google")
    public ResponseEntity<ApiResponse<AuthenticationResponse>> googleLogin(@Valid @RequestBody GoogleLoginRequest request) {
        ApiResponse<AuthenticationResponse> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Login successful",
                oauthService.authenticate(request.getCredential())
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
