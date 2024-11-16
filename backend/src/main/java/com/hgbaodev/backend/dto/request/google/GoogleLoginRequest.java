package com.hgbaodev.backend.dto.request.google;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GoogleLoginRequest {
    @NotEmpty(message = "Credential is required")
    private String credential;

    @NotEmpty(message = "Client ID is required")
    private String clientId;

    @NotEmpty(message = "select_by Secret is required")
    private String select_by;
}
