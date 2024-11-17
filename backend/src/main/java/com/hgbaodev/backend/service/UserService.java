package com.hgbaodev.backend.service;

import com.hgbaodev.backend.model.User;
import com.hgbaodev.backend.request.users.ChangePasswordRequest;
import java.security.Principal;

public interface UserService {
    public void changePassword(ChangePasswordRequest request);
    public User getInfoCurrentUser();
    User updateInfoCurrentUser(User updateUser);
}
