package com.hgbaodev.backend.service;

public interface OpenAiService {
    String askQuestion(String question);

    String extractTextFromResponse(String responseBody);
}