package com.hgbaodev.backend.strategies;

import com.hgbaodev.backend.dto.response.OAuthUser;

public interface OAuthStrategy {
    OAuthUser authenticate(String credential);
}
