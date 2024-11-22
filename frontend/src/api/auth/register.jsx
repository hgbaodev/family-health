import { api } from "~/config/api";
import { useMutation } from "@tanstack/react-query";

export const register = ({ firstname, lastname, email, password }) => {
  return api.post(`/auth/register`, {
    firstname,
    lastname,
    email,
    password,
  });
};

export const useRegister = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  return useMutation({
    mutationFn: register,
    onSuccess: (data, ...args) => {
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};
