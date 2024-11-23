package com.hgbaodev.backend.dto.request.medicalRecord;

import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DocumentRequest {
    @NotNull(message = "Position is required")
    private Integer position;

    @NotBlank(message = "Name is required")
    @Size(max = 255, message = "Name must not exceed 255 characters")
    private String name;

    @NotBlank(message = "Type is required")
    @Size(max = 50, message = "Type must not exceed 50 characters")
    private String type;

    @NotNull(message = "Size is required")
    private Long size;

    @NotBlank(message = "Path is required")
    @Size(max = 255, message = "Path must not exceed 255 characters")
    private String path;
}