import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getEmergencyContactsQueryOptions } from "./get-emergencyContacts";
// import { useDeleteEmergencyContact } from "/src/api/emergencyContacts/delete-emergencyContact";

import { api } from "~/config/api";
// import { useRouteError } from "react-router-dom"; // Nếu không dùng, có thể bỏ

// Hàm để xóa liên hệ khẩn cấp theo ID
export const deleteEmergencyContact = (id) => {
  return api.delete(`/emergencyContacts/${id}`);
};

// Hook sử dụng để xóa liên hệ khẩn cấp
export const useDeleteEmergencyContact = (options = {}) => {
  // nội dung hàm

  const { onSuccess, onError, ...restConfig } = options;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmergencyContact,
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getEmergencyContactsQueryOptions.queryKey,
      });
      // Gọi callback `onSuccess` nếu có
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      // Gọi callback `onError` nếu có
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};