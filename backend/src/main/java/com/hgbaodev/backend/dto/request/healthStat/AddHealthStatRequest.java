package com.hgbaodev.backend.dto.request.healthStat;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.hgbaodev.backend.model.Member;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AddHealthStatRequest {

    private Integer statID;

    private Integer memberID;

    private String statType;

    @NotNull(message = "Status value is required")
    private float statValue;

    @NotNull(message = "Date and time is required")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime date;
}
