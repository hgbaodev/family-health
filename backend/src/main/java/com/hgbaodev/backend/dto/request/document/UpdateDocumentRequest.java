package com.hgbaodev.backend.dto.request.document;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UpdateDocumentRequest {
    private Integer documentID;

    private Integer recordID;

    @NotBlank(message = "fileName type is required")
    @Size(max = 50, message = "File name type must not exceed 50 characters")
    private String fileName;

    @NotBlank(message = "File type is required")
    @Size(max = 20, message = "File type must not exceed 20 characters")
    private String fileType;

    @NotNull(message = "Upload date is required")
    @PastOrPresent(message = "Upload date must be a date in the past or present")
    private java.time.LocalDate uploadDate;
}
