import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/axios/api"; // Đảm bảo đường dẫn đến file `api` là chính xác

// 1. Hàm API để cập nhật mật khẩu người dùng
export const changPassword = async (id, newPassword) => {
  const response = await api.put(`/user/${id}/changePassword`, { password: newPassword });
  return response.data;
};

// 2. Custom hook để sử dụng useMutation cho việc thay đổi mật khẩu
export const useChangePassword = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn gọi hàm API updatePassword
    mutationFn: ({ id, newPassword }) => changePassword(id, newPassword),

    // Xử lý khi cập nhật thành công
    onSuccess: (data, ...args) => {
      // Làm mới cache nếu cần, ví dụ: có thể là các thông tin liên quan đến bảo mật
      queryClient.invalidateQueries({
        queryKey: ["user", { id }],
      });
      onSuccess?.(data, ...args); // Gọi callback onSuccess nếu có
    },

    // Xử lý khi cập nhật thất bại
    onError: (error, ...args) => {
      onError?.(error, ...args); // Gọi callback onError nếu có
    },

    // Các cấu hình khác được truyền từ options
    ...restConfig,
  });
};
