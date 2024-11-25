package com.hgbaodev.backend.controller;

import com.hgbaodev.backend.dto.request.users.ChangePasswordRequest;
import com.hgbaodev.backend.dto.response.ApiResponse;
import com.hgbaodev.backend.dto.response.UserResponse;
import com.hgbaodev.backend.model.Member;
import com.hgbaodev.backend.model.User;
import com.hgbaodev.backend.service.UserService;
import com.hgbaodev.backend.utils.CustomPagination;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    @GetMapping
    public ResponseEntity<ApiResponse<CustomPagination<UserResponse>>> getAllMembers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "8") int size,
            @RequestParam(defaultValue = "") String keyword) {
        Page<UserResponse> usersPage = service.getAllUsers(page, size, keyword);

        CustomPagination<UserResponse> usersContent = new CustomPagination<>(usersPage);

        ApiResponse<CustomPagination<UserResponse>> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Get list users successfully",
                usersContent
        );

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateBlockState(
            @PathVariable("id") Integer id) {
        UserResponse updateUser = service.updateBlockStateUser(id);
        ApiResponse<UserResponse> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Update member successfully",
                updateUser
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping
    public ResponseEntity<?> changePassword(
          @RequestBody ChangePasswordRequest request,
          Principal connectedUser
    ) {
        service.changePassword(request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users-created-today")
    public ResponseEntity<ApiResponse<Long>> countContactsReceivedToday(){
        long count = service.countUsersCreatedToday();
        ApiResponse<Long> response = new ApiResponse<>(
                HttpStatus.OK.value(),
                "Users created today: ",
                count
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
