package com.hgbaodev.backend.service.impl;

import com.hgbaodev.backend.model.User;
import com.hgbaodev.backend.repository.UserRepository;
import com.hgbaodev.backend.request.users.ChangePasswordRequest;
import com.hgbaodev.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository repository;


    public User getUserById(Integer id) {
        return repository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public User updateUser(Integer id, User updatedUser) {
        User user = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setFirstname(updatedUser.getFirstname());
        user.setLastname(updatedUser.getLastname());
        user.setPhoneNumber(updatedUser.getPhoneNumber());
        return repository.save(user);
    }

//    public void changePassword(Integer id, ChangePasswordRequest request) {
//        User user = repository.findById(id).orElseThrow(() -> new UsernameNotFoundException(id));
//        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
//            throw new IncorrectPasswordException();
//        }
//        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
//        repository.save(user);
//    }
//


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

}
