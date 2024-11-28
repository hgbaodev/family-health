package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.dto.response.DataMailDTO;
import com.hgbaodev.backend.kafka.EmailProducer;
import com.hgbaodev.backend.mapper.UserMapper;
import com.hgbaodev.backend.service.JwtService;
import com.hgbaodev.backend.enums.TokenType;
import com.hgbaodev.backend.model.Token;
import com.hgbaodev.backend.model.User;
import com.hgbaodev.backend.repository.TokenRepository;
import com.hgbaodev.backend.repository.UserRepository;
import com.hgbaodev.backend.dto.request.auth.LoginRequest;
import com.hgbaodev.backend.dto.request.auth.RegisterRequest;
import com.hgbaodev.backend.dto.response.ApiResponse;
import com.hgbaodev.backend.dto.response.AuthenticationResponse;
import com.hgbaodev.backend.dto.response.UserResponse;
import com.hgbaodev.backend.service.AuthenticationService;
import com.hgbaodev.backend.service.MailService;
import com.hgbaodev.backend.utils.Const;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository repository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final MailService mailService;
    private final EmailProducer emailProducer;

    public AuthenticationResponse register(RegisterRequest request) {
        if(repository.existsByEmail(request.getEmail())) {
            throw new IllegalStateException("Email already exists");
        }

        var user = UserMapper.INSTANCE.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));

//        var savedUser = repository.save(user);
        DataMailDTO dataMail = new DataMailDTO();

        dataMail.setTo(request.getEmail());
        dataMail.setSubject(Const.SEND_MAIL_SUBJECT.CLIENT_REGISTER);
        Map<String, Object> props = new HashMap<>();
        props.put("name", request.getFirstname());
        props.put("username", request.getEmail());
        dataMail.setProps(props);
        dataMail.setTemplate(Const.TEMPLATE_FILE_NAME.CLIENT_REGISTER);
        emailProducer.sendEmailMessage(dataMail);

        UserResponse userResponse = UserMapper.INSTANCE.toUserResponse(null);

        return AuthenticationResponse.builder()
                .user(userResponse)
                .build();
    }

    public void verifyEmail(String username) {
        var user = repository.findByEmail(username).orElseThrow();
        user.set_verify(true);
        repository.save(user);
    }

    public AuthenticationResponse authenticate(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (Exception e) {
            return null;
        }

        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        if(!user.is_verify() || user.is_block()) {
            return null;
        }
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        UserResponse userResponse = UserResponse.builder()
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .role(user.getRole())
                .build();

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .user(userResponse)
                .build();
    }

    public void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    public AuthenticationResponse authenticateWithEmail(String email) {
        var user = repository.findByEmail(email)
                .orElseThrow();
        if(!user.is_verify() || user.is_block()) {
            return null;
        }
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        UserResponse userResponse = UserResponse.builder()
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .build();

        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .user(userResponse)
                .build();
    }

    public void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    public ResponseEntity<ApiResponse<?>> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            ApiResponse<String> errorResponse = new ApiResponse<>(400,"Missing or invalid Authorization header. Bearer token required.", null);
            return ResponseEntity.badRequest().body(errorResponse);
        }

        final String refreshToken = authHeader.substring(7);
        final String userEmail = jwtService.extractUsername(refreshToken);

        if (userEmail == null) {
            ApiResponse<String> errorResponse = new ApiResponse<>(400,"Invalid refresh token", null);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }

        var user = this.repository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!jwtService.isTokenValid(refreshToken, user)) {
            ApiResponse<String> errorResponse = new ApiResponse<>(400,"Refresh token is not valid", null);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }

        var accessToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, accessToken);

        var authResponse = AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .user(UserResponse.builder()
                        .firstname(user.getFirstname())
                        .lastname(user.getLastname())
                        .email(user.getEmail())
                        .build())
                .build();

        ApiResponse<AuthenticationResponse> apiResponse = new ApiResponse<>(200,"Token refreshed successfully", authResponse);
        return ResponseEntity.ok(apiResponse);
    }

    public ResponseEntity<ApiResponse<?>> getMe(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            ApiResponse<String> errorResponse = new ApiResponse<>(400,"Missing or invalid Authorization header. Bearer token required.", null);
            return ResponseEntity.badRequest().body(errorResponse);
        }

        final String access_token = authHeader.substring(7);
        final String userEmail = jwtService.extractUsername(access_token);

        if (userEmail == null) {
            ApiResponse<String> errorResponse = new ApiResponse<>(400,"Invalid refresh token", null);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }

        var user = this.repository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!jwtService.isTokenValid(access_token, user)) {
            ApiResponse<String> errorResponse = new ApiResponse<>(400,"Refresh token is not valid", null);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }



        var authResponse = AuthenticationResponse.builder()
                .accessToken(access_token)
                .refreshToken("")
                .user(UserResponse.builder()
                        .firstname(user.getFirstname())
                        .lastname(user.getLastname())
                        .email(user.getEmail())
                        .build())
                .build();

        ApiResponse<AuthenticationResponse> apiResponse = new ApiResponse<>(200,"Get infomation successlly", authResponse);
        return ResponseEntity.ok(apiResponse);
    }

    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UsernameNotFoundException("No authenticated user found");
        }

        String userEmail;
        if (authentication.getPrincipal() instanceof UserDetails) {
            userEmail = ((UserDetails) authentication.getPrincipal()).getUsername();
        } else {
            userEmail = authentication.getPrincipal().toString();
        }
        return repository.findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

}
