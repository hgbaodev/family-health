package com.hgbaodev.backend.controller;

import com.hgbaodev.backend.model.Member;
import com.hgbaodev.backend.response.ApiResponse;
import com.hgbaodev.backend.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/openai")
@RequiredArgsConstructor
public class OpenAiController {

    private final OpenAiService openAiService;

    @PostMapping("/ask")
    public ResponseEntity<ApiResponse<String>> askQuestion(@RequestBody Map<String, String> request) {
        String question = request.get("question");
        String text = openAiService.askQuestion(question);
        ApiResponse<String> response;
        if(text == null) {
            response = new ApiResponse<String>(
                    HttpStatus.BAD_REQUEST.value(),
                    "Error when calling the OpenAI API",
                    ""
            );
        } else {
            response = new ApiResponse<String>(
                    HttpStatus.OK.value(),
                    "Successfully called the OpenAI API",
                    text
            );
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
