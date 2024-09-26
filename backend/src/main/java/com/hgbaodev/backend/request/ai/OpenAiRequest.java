package com.hgbaodev.backend.request.ai;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OpenAiRequest {
    private String model;
    private String prompt;
    private int maxTokens;
    private double temperature;
}
