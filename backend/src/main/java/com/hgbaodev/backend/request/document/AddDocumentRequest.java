package com.hgbaodev.backend.request.document;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AddDocumentRequest {
    private Integer documentID;

    private Integer recordID;

    @NotBlank(message = "fileName type is required")
    @Size(max = 50, message = "File name type must not exceed 50 characters")
    private String fileName;

    @NotBlank(message = "File type is required")
    @Size(max = 20, message = "File type must not exceed 20 characters")
    private String fileType;

    @NotBlank(message = "File content is required")
    @Size(max = 500, message = "File content must not exceed 500 characters")
    private String fileContent;

    @NotNull(message = "Upload date is required")
    @Past(message = "Upload date must be a date")
    private java.time.LocalDate uploadDate;
}