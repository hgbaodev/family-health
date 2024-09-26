package com.hgbaodev.backend.controller;

import com.hgbaodev.backend.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/openai")
@RequiredArgsConstructor
public class OpenAiController {

    private final OpenAiService openAiService;

    @PostMapping("/ask")
    public ResponseEntity<String> askQuestion(@RequestBody Map<String, String> request) {
        String question = request.get("question");
        String response = openAiService.askQuestion(question);
        return ResponseEntity.ok(response);
    }

}
