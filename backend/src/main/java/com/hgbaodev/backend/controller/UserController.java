package com.hgbaodev.backend.controller;

import com.hgbaodev.backend.model.User;
import com.hgbaodev.backend.request.users.ChangePasswordRequest;
import com.hgbaodev.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;


//    @PutMapping("/{id}")
//    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody User updatedUser) {
//        User user = service.updateUser(id, updatedUser);
//        return ResponseEntity.ok(user);
//    }

    @PatchMapping
    public ResponseEntity<?> changePassword(
          @RequestBody ChangePasswordRequest request,
          Principal connectedUser
    ) {
        service.changePassword(request);
        return ResponseEntity.ok().build();
    }



}
