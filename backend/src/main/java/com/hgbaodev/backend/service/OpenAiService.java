package com.hgbaodev.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
public class OpenAiService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public String askQuestion(String question) {
        log.info("API Key: {}", apiKey);
        log.info("API URL: {}", apiUrl);
        log.info("Question: {}", question);

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + apiKey);

            ObjectNode requestBody = objectMapper.createObjectNode();
            requestBody.put("model", "gpt-3.5-turbo");

            ArrayNode messagesArray = requestBody.putArray("messages");
            ObjectNode messageObject = messagesArray.addObject();
            messageObject.put("role", "user");
            messageObject.put("content", question);

            HttpEntity<String> request = new HttpEntity<>(requestBody.toString(), headers);

            ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, request, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode jsonNode = objectMapper.readTree(response.getBody());
                return jsonNode.path("choices").get(0).path("message").path("content").asText().trim();
            } else {
                return "Error: " + response.getStatusCode();
            }
        } catch (HttpClientErrorException e) {
            if (e.getRawStatusCode() == 429) {
                log.error("Rate limit exceeded or insufficient quota for OpenAI API");
                return "Sorry, we've reached our usage limit. Please try again later or contact support.";
            } else {
                log.error("Error calling OpenAI API", e);
                return "An error occurred while processing your request. Please try again later.";
            }
        } catch (Exception e) {
            log.error("Unexpected error calling OpenAI API", e);
            return "An unexpected error occurred. Please try again later.";
        }
    }
}