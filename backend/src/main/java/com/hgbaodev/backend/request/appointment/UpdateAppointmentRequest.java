package com.hgbaodev.backend.request.appointment;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalTime;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateAppointmentRequest {

  @NotNull(message = "MemberID is required")
  private Integer memberID;

  @NotNull(message = "Time is required")
  private Date time;

  @NotBlank(message = "Doctor is required")
  private String doctor;

  @NotBlank(message = "Location is required")
  private String location;
}
