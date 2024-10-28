import { useQuery } from "@tanstack/react-query";
import { api } from "~/axios/api"; // Đảm bảo đường dẫn chính xác đến tệp Axios của bạn

// API để lấy thông tin người dùng theo ID
export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

// Cấu hình tùy chọn query cho react-query để lấy thông tin người dùng
export const getUserQueryOptions = (id) => {
  return {
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id, // Chỉ chạy khi id có giá trị
  };
};

// Custom hook sử dụng react-query để lấy thông tin người dùng
export const useUserInfo = ({ queryConfig = {}, id }) => {
  return useQuery({
    ...getUserQueryOptions(id),
    onSuccess: (data) => {
      console.log("User data:", data); // Log kết quả ra console để kiểm tra dữ liệu
    },
    ...queryConfig,
  });
};
