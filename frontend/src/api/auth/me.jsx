import { useMutation } from "@tanstack/react-query";
import { api } from "~/axios/api";
import { useAuthStore } from "~/stores/auth/authStore";

export const me = () => {
  return api.get(`/auth/me`);
};

export const useMe = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;
  const { setUser, setIsAuthenticated, setIsLoaded } = useAuthStore((state) => state);

  return useMutation({
    suspense: true,
    mutationFn: me,
    onSuccess: (data, ...args) => {
      const result = data.data;
      setUser(result.user);
      setIsAuthenticated(true);
      setIsLoaded(true);
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
      setIsLoaded(true);
      setIsAuthenticated(false);
    },
    ...restConfig,
  });
};