package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.context.OAuthContext;
import com.hgbaodev.backend.dto.response.AuthenticationResponse;
import com.hgbaodev.backend.dto.response.OAuthUser;
import com.hgbaodev.backend.enums.Role;
import com.hgbaodev.backend.model.User;
import com.hgbaodev.backend.repository.UserRepository;
import com.hgbaodev.backend.service.OAuthService;
import com.hgbaodev.backend.strategies.GoogleAuthStrategy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class OAuthServiceImpl implements OAuthService {
    private final UserRepository userRepository;
    private final AuthenticationServiceImpl authenticationService;

    @Override
    public AuthenticationResponse authenticate(String credential) {
        OAuthContext oAuthContext = new OAuthContext(new GoogleAuthStrategy());
        OAuthUser oauthUser = oAuthContext.authenticate(credential);
        Optional<User> checkUser = userRepository.findByEmail(oauthUser.getEmail());
        if (checkUser.isEmpty()) {
            String[] nameParts = oauthUser.getName().split(" ", 2);
            String firstName = nameParts.length > 0 ? nameParts[0] : "";
            String lastName = nameParts.length > 1 ? nameParts[1] : "";

            var user = User.builder()
                    .email(oauthUser.getEmail())
                    .firstname(firstName)
                    .lastname(lastName)
                    .role(Role.USER)
                    .is_verify(true)
                    .is_block(false)
                    .build();
            userRepository.save(user);
        }
        return authenticationService.authenticateWithEmail(oauthUser.getEmail());
    }
}
