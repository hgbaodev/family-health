package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.dto.request.users.ChangePasswordRequest;
import com.hgbaodev.backend.dto.response.UserResponse;
import com.hgbaodev.backend.mapper.UserMapper;
import com.hgbaodev.backend.model.User;
import com.hgbaodev.backend.repository.UserRepository;
import com.hgbaodev.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository repository;

    public Page<UserResponse> getAllUsers(int page, int size, String keyword) {
        Pageable pageable = PageRequest.of(page - 1, size);
        return UserMapper.INSTANCE.toUsersResponse(repository.findByKeyword(keyword, pageable));
    }

    @Override
    public UserResponse updateBlockStateUser(Integer id) {
        User user = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User is not found!!!"));
        user.set_block(!user.is_block());
        return UserMapper.INSTANCE.toUserResponse(repository.save(user));
    }

    public void changePassword(ChangePasswordRequest request, Principal connectedUser) {

        var user = (User) ((UsernamePasswordAuthenticationToken) connectedUser).getPrincipal();

        // check if the current password is correct
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Wrong password");
        }
        // check if the two new passwords are the same
        if (!request.getNewPassword().equals(request.getConfirmationPassword())) {
            throw new IllegalStateException("Password are not the same");
        }

        // update the password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        // save the new password
        repository.save(user);
    }

    @Override
    public long countUsersCreatedToday() {
        return repository.countUsersCreatedToday();
    }
}
