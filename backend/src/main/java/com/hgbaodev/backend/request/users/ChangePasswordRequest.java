package com.hgbaodev.backend.request.users;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordRequest {

    @NotBlank(message = "Mật khẩu hiện tại là bắt buộc.")
    private String currentPassword;

    @NotBlank(message = "Mật khẩu mới là bắt buộc.")
    @Size(min = 8, message = "Mật khẩu mới phải dài ít nhất 8 ký tự.")
    private String newPassword;

    @NotBlank(message = "Xác nhận mật khẩu là bắt buộc.")
    private String confirmationPassword;
}
