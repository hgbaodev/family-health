package com.hgbaodev.backend.dto.request.vaccication;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateVaccinationRequest {

    private Integer vaccinationId;

    @NotNull(message = "MemberId is required")
    private Integer memberId;

    @NotBlank(message = "VaccineName is required")
    private String vaccineName;

    @NotNull(message = "DateAdministered is required")
    private Date dateAdministered;

}