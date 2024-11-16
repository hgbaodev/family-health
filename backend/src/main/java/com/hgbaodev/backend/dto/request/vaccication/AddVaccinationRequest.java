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
public class AddVaccinationRequest {

    private Integer vaccinationID;

    @NotNull(message = "MemberId is required")
    private Integer memberID;

    @NotBlank(message = "VaccineName is required")
    private String vaccineName;

    @NotNull(message = "DateAdministered is required")
    private Date dateAdministered;

}