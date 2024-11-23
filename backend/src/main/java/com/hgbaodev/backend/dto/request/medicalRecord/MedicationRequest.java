package com.hgbaodev.backend.dto.request.medicalRecord;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MedicationRequest {
    @NotNull(message = "Position is required")
    private Integer position;

    @NotBlank(message = "Name is required")
    @Size(max = 255, message = "Name must not exceed 255 characters")
    private String name;

    @NotBlank(message = "Frequency is required")
    @Size(max = 255, message = "Frequency must not exceed 255 characters")
    private String frequency;

    @NotNull(message = "Start date is required")
    private LocalDate startDate;

    private LocalDate endDate;
}