import { useMutation} from "@tanstack/react-query";
import { api } from "~/axios/api";

export const changePassword = (data) => {
  return api.post(`/account-settings/change-password`, data);
};

export const useChangePassword = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  return useMutation({
    mutationFn: ({ data }) => changePassword(data),
    onSuccess: (data, ...args) => {
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};