package com.hgbaodev.backend.request.allergy;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AddAllergyRequest {
    private Integer allergyID;

    private Integer memberID;

    @NotBlank(message = "Allergy type is required")
    @Size(max = 100, message = "Allergy type must not exceed 100 characters")
    private String allergyType;

    @NotBlank(message = "Severity is required")
    @Size(max = 100, message = "Severity must not exceed 100 characters")
    private String severity;

    @NotBlank(message = "Symptoms is required")
    @Size(max = 300, message = "Symptoms must not exceed 100 characters")
    private String symptoms;
}