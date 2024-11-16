package com.hgbaodev.backend.dto.request.member;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateMemberRequest {

  private Integer memberID;

  private Integer userID;

  @NotBlank(message = "FullName is required")
  @Size(max = 100, message = "FullName must not exceed 100 characters")
  private String fullName;

  @NotNull(message = "DateOfBirth is required")
  @Past(message = "DateOfBirth must be a past date")
  private java.time.LocalDate dateOfBirth;

  @NotBlank(message = "Gender is required")
  @Pattern(regexp = "Male|Female|Other", message = "Gender must be Male, Female, or Other")
  private String gender;

  @NotBlank(message = "Relationship is required")
  private String relationship;

  @NotBlank(message = "BloodType is required")
  @Pattern(regexp = "A|B|AB|O", message = "BloodType must be A, B, AB, or O")
  private String bloodType;

  @NotNull(message = "Height is required")
  @Min(value = 0, message = "Height must be greater than or equal to 0")
  private Float height;

  @NotNull(message = "Weight is required")
  @Min(value = 0, message = "Weight must be greater than or equal to 0")
  private Float weight;
}
