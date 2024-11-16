package com.hgbaodev.backend.context;

import com.hgbaodev.backend.dto.response.OAuthUser;
import com.hgbaodev.backend.strategies.OAuthStrategy;

public class OAuthContext {
    private final OAuthStrategy oAuthStrategy;

    public OAuthContext(OAuthStrategy oAuthStrategy) {
        this.oAuthStrategy = oAuthStrategy;
    }

    public OAuthUser authenticate(String credential) {
        return oAuthStrategy.authenticate(credential);
    }
}
