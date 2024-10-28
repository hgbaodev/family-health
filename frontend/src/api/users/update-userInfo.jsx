import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/axios/api"; // Đường dẫn đến tệp Axios đã cấu hình của bạn
import { getUserInfoQueryOptions } from "~/api/users/get-userInfo";

// API để cập nhật thông tin cài đặt tài khoản
export const updateUserInfo = async (id, data) => {
  return api.put(`/user/${id}`, data);

};

// 2. Custom hook sử dụng useMutation để cập nhật thông tin người dùng
export const useUpdateUserInfo = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn để gọi hàm cập nhật thông tin người dùng với id và userData
    mutationFn: ({ id, userData }) => updateUserInfo(id, data),

    // Xử lý khi cập nhật thành công
    onSuccess: (data, ...args) => {
      // invalidate query cache để đảm bảo thông tin người dùng luôn mới
      queryClient.invalidateQueries({
        queryKey: getUserInfoQueryOptions.queryKey,
      });
      onSuccess?.(data, ...args); // Gọi onSuccess callback nếu có
    },

    // Xử lý khi cập nhật thất bại
    onError: (error, ...args) => {
      onError?.(error, ...args); // Gọi onError callback nếu có
    },

    // Các cấu hình khác từ options
    ...restConfig,
  });
};

