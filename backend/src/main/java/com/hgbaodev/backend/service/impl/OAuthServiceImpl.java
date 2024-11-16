package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.context.OAuthContext;
import com.hgbaodev.backend.dto.response.AuthenticationResponse;
import com.hgbaodev.backend.dto.response.OAuthUser;
import com.hgbaodev.backend.model.User;
import com.hgbaodev.backend.repository.UserRepository;
import com.hgbaodev.backend.service.OAuthService;
import com.hgbaodev.backend.strategies.GoogleAuthStrategy;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class OAuthServiceImpl implements OAuthService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public String authenticate(String credential) {
        log.info("Google login credential: {}", credential);
        OAuthContext oAuthContext = new OAuthContext(new GoogleAuthStrategy());
        OAuthUser oauthUser = oAuthContext.authenticate(credential);
        return oauthUser.getEmail();
    }
}
