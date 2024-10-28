package com.hgbaodev.backend.service;

public interface ForgotPasswordService {
    String sendOTP(String email);
    String sendNewPassword(String email, String otp);
}
