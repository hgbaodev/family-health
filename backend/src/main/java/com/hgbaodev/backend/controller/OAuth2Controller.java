package com.hgbaodev.backend.controller;

import com.hgbaodev.backend.dto.request.google.GoogleLoginRequest;
import com.hgbaodev.backend.service.OAuthService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/oauth2")
@Slf4j
public class OAuth2Controller {

    @Autowired
    private OAuthService oauthService;

    @PostMapping("/google")
    public ResponseEntity<String> googleLogin(@Valid @RequestBody GoogleLoginRequest request) {
        return ResponseEntity.ok(oauthService.authenticate(request.getCredential()));
    }

}
