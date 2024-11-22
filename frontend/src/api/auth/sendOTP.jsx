import { api } from "~/config/api";
import { useMutation } from "@tanstack/react-query";

export const sendOTP = ({ email }) => {
    return api.post(`/auth/forgot-password`, {
      email
    });
  };

  export const useSendOTP = (options = {}) => {
    const { onSuccess, onError, ...restConfig } = options;
  
    return useMutation({
      mutationFn: sendOTP,
      onSuccess: (data, ...args) => {
        onSuccess?.(data, ...args);
      },
      onError: (error, ...args) => {
        onError?.(error, ...args);
      },
      ...restConfig,
    });
  };