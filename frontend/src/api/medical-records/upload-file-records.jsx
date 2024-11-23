import { useMutation } from "@tanstack/react-query";
import { api } from "~/config/api";

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post(`/files/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUploadFile = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  return useMutation({
    mutationFn: (file) => uploadFile(file),
    onSuccess: (data, ...args) => {
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};