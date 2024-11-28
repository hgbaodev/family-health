import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { api } from "~/config/api";
import { useAuthStore } from "~/stores/authStore";

export const login = ({ email, password }) => {
  return api.post(`/auth/login`, {
    email,
    password,
  });
};

export const useLogin = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;
  const { setUser, setIsAuthenticated } = useAuthStore((state) => state);

  return useMutation({
    mutationFn: login,
    onSuccess: (data, ...args) => {
      const result = data.data;
      setUser(result.user);
      Cookies.set("access_token", result.access_token);
      Cookies.set("refresh_token", result.refresh_token);
      setIsAuthenticated(true);
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
      setIsAuthenticated(false);
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
    },
    ...restConfig,
  });
};

export const useGoogleLogin = ({ data }) => {
  return api.post(`/oauth2/google`, data);
};

export const useGoogleLoginMutation = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;
  const { setUser, setIsAuthenticated } = useAuthStore((state) => state);

  return useMutation({
    onSuccess: (data, ...args) => {
      const result = data.data;
      setUser(result.user);
      Cookies.set("access_token", result.access_token);
      Cookies.set("refresh_token", result.refresh_token);
      setIsAuthenticated(true);
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args),
      setIsAuthenticated(false);
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
    },
    ...restConfig,
    mutationFn: useGoogleLogin,
  });
};
