import { useMutation } from "@tanstack/react-query";
import { api } from "~/axios/api";
import { useAuthStore } from "~/stores/authStore";

export const login = ({ email, password }) => {
  return api.post(`/auth/login`, {
    params: {
      email,
      password,
    },
  });
};

export const useLogin = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: login,
    onSuccess: (data, ...args) => {
      setUser(data);
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};