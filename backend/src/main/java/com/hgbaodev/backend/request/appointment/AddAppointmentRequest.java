package com.hgbaodev.backend.request.appointment;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AddAppointmentRequest {

  @NotNull(message = "MemberID is required")
  private int memberID;

  @NotNull(message = "Time is required")
  private LocalTime time;

  @NotBlank(message = "Doctor is required")
  private String doctor;

  @NotBlank(message = "Location is required")
  private String location;

}
