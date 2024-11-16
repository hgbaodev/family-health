package com.hgbaodev.backend.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GoogleUserInfo {
    private String name;
    private String email;
    private String picture;
}