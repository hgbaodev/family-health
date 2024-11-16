package com.hgbaodev.backend.dto.response;

import com.hgbaodev.backend.enums.AuthProvider;
import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OAuthUser {
    private String name;
    private String email;
    private String avatar;
    private AuthProvider provider;
}