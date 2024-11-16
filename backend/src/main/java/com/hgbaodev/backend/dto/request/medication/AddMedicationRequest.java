package com.hgbaodev.backend.dto.request.medication;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AddMedicationRequest {

  private Integer recordID = 1;

  @NotBlank(message = "Medication name is required")
  @Size(max = 100, message = "Medication name must not exceed 100 characters")
  private String name;

  @NotBlank(message = "Frequency is required")
  private String frequency;

  @NotNull(message = "Start date is required")
  @Past(message = "Start date must be a past date")
  private java.time.LocalDate startDate;

//  @NotNull(message = "End date is required")
//  @Past(message = "End date must be a past date")
  private java.time.LocalDate endDate;

//  @NotBlank(message = "Note is required")
  private String note;
}
