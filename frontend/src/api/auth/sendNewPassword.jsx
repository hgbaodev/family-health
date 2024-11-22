import { api } from "~/config/api";
import { useMutation } from "@tanstack/react-query";

export const sendNewPassword = ({ email, otp }) => {
    return api.post(`/auth/otp`, { email, otp });
  };

  export const useSendNewPassword = (options = {}) => {
    const { onSuccess, onError, ...restConfig } = options;
  
    return useMutation({
      mutationFn: sendNewPassword,
      onSuccess: (data, ...args) => {
        onSuccess?.(data, ...args);
      },
      onError: (error, ...args) => {
        onError?.(error, ...args);
      },
      ...restConfig,
    });
  };