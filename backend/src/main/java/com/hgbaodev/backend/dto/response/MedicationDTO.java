package com.hgbaodev.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MedicationDTO {
    private int id;
    private String position;
    private String name;
    private String frequency;
    private LocalDate startDate;
    private LocalDate endDate;
}
