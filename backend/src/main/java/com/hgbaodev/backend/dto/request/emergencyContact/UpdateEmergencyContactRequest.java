package com.hgbaodev.backend.dto.request.emergencyContact;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateEmergencyContactRequest {

    private Integer id;

    private Integer userId;

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String name;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Phone number must be valid and between 10 to 15 digits")
    private String phoneNumber;

    @NotBlank(message = "Relationship is required")
    private String relationship;


    // Optional field for additional notes
    @Size(max = 255, message = "Notes must not exceed 255 characters")
    private String notes;
}
