import { api } from "~/config/api";
import { useMutation } from "@tanstack/react-query";

export const verify = (username) => {
  return api.get(`/auth/login`, {
    params: { username },
  });
};

export const useVerify = (options = {}) => {
  return useMutation({
    mutationFn: (username) => verify(username),
    ...options,
  });
};