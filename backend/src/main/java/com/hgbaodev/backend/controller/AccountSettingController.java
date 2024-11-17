    package com.hgbaodev.backend.controller;

    import com.hgbaodev.backend.model.Medication;
    import com.hgbaodev.backend.model.User;
    import com.hgbaodev.backend.request.medication.AddMedicationRequest;
    import com.hgbaodev.backend.request.medication.UpdateMedicationRequest;
    import com.hgbaodev.backend.request.users.ChangePasswordRequest;
    import com.hgbaodev.backend.request.users.UpdateUserInfoRequest;
    import com.hgbaodev.backend.response.ApiResponse;
    import com.hgbaodev.backend.response.UserInfoResponse;
    import com.hgbaodev.backend.service.AuthenticationService;
    import com.hgbaodev.backend.service.MedicationService;
    import com.hgbaodev.backend.service.UserService;
    import jakarta.validation.Valid;
    import lombok.RequiredArgsConstructor;
    import lombok.extern.slf4j.Slf4j;
    import org.springframework.data.domain.Page;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.security.Principal;
    import java.util.List;

    @RestController
    @RequestMapping("/api/v1/account-settings")
    @RequiredArgsConstructor
    @Slf4j
    public class AccountSettingController {

        private final AuthenticationService authenticationService;
        private final UserService userService;


        @GetMapping
        public ResponseEntity<ApiResponse<UserInfoResponse>> getInfoCurrentUser() {
            User user = authenticationService.getCurrentUser();

            UserInfoResponse userInfoResponse = UserInfoResponse.builder()
                    .firstname(user.getFirstname())
                    .lastname(user.getLastname())
                    .phoneNumber(user.getPhoneNumber())
                    .email(user.getEmail()).build();

            ApiResponse<UserInfoResponse> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Get current user successfully",
                    userInfoResponse
            );
            log.info("Đang lấy thông tin người dùng hiện tại với ID: {}", user.getId());


            return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @PutMapping()
        public ResponseEntity<ApiResponse<UserInfoResponse>> updateInfoCurrentUser(
                @Valid @RequestBody
                UpdateUserInfoRequest updateUserInfoRequest){

            User currentUser = authenticationService.getCurrentUser();

            currentUser.setFirstname(updateUserInfoRequest.getFirstname());
            currentUser.setLastname(updateUserInfoRequest.getLastname());
            currentUser.setPhoneNumber(updateUserInfoRequest.getPhoneNumber());

            User updateUser = userService.updateInfoCurrentUser(currentUser);
             UserInfoResponse userInfoResponse = UserInfoResponse.builder()
                     .firstname(updateUser.getFirstname())
                     .lastname(updateUser.getLastname())
                     .email(currentUser.getEmail())
                     .phoneNumber(updateUser.getPhoneNumber())
                     .build();
             ApiResponse<UserInfoResponse> response = new ApiResponse<>(
                     HttpStatus.OK.value(),
                     "Update information user successly",
                     userInfoResponse
             );
             log.info("Updated information success with id: {}", currentUser.getId());

             return new ResponseEntity<>(response, HttpStatus.OK);
        }

        @PostMapping("/change-password")
        public ResponseEntity<ApiResponse<String>> changePassword(
                @Valid @RequestBody ChangePasswordRequest request) {

            userService.changePassword(request);

            ApiResponse<String> response = new ApiResponse<>(
                    HttpStatus.OK.value(),
                    "Password changed successfully",
                    "Password changed successfully"
            );
            return new ResponseEntity<>(response, HttpStatus.OK);
        }




    }
