package com.hgbaodev.backend.service;


import com.hgbaodev.backend.dto.response.AuthenticationResponse;

public interface OAuthService {
    String authenticate(String credential);
}
