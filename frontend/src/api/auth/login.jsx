import { useMutation } from "@tanstack/react-query";
import { api } from "~/axios/api";
import { useAuthStore } from "~/stores/auth/authStore";

export const login = ({ email, password }) => {
  return api.post(`/auth/login`, {
    email,
    password,
  });
};

export const useLogin = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;
  const { setUser, setIsAuthenticated, setIsLoaded } = useAuthStore((state) => state);

  return useMutation({
    mutationFn: login,
    onSuccess: (data, ...args) => {
      const result = data.data;
      setUser(result.user);
      localStorage.setItem("access_token", result.access_token);
      localStorage.setItem("refresh_token", result.refresh_token);
      setIsAuthenticated(true);
      setIsLoaded(true);
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
      setIsLoaded(true);
      setIsAuthenticated(false);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
    ...restConfig,
  });
};

export const useGoogleLogin = ({ data }) => {
  return api.post(`/oauth2/google`, data);
};

export const useGoogleLoginMutation = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;
  const { setUser, setIsAuthenticated, setIsLoaded } = useAuthStore((state) => state);

  return useMutation({
    onSuccess: (data, ...args) => {
      const result = data.data;
      setUser(result.user);
      localStorage.setItem("access_token", result.access_token);
      localStorage.setItem("refresh_token", result.refresh_token);
      setIsAuthenticated(true);
      setIsLoaded(true);
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args),
      setIsLoaded(true);
      setIsAuthenticated(false);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    },
    ...restConfig,
    mutationFn: useGoogleLogin,
  });
};
