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

export const useLogin = ({ mutationConfig }) => {
  const { onSuccess, onError, ...restConfig } = mutationConfig || {};
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    onSuccess: (data, ...args) => {
      setUser(data);
      onSuccess?.(data, ...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
    ...restConfig,
    mutationFn: login,
  });
};