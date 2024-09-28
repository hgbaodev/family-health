import { useMutation } from "@tanstack/react-query";
import { api } from "~/axios/api";

export const deleteMember = (id) => {
  return api.delete(`/members/${id}`);
};

export const useDeleteMember = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  return useMutation({
    mutationFn: deleteMember,
    onSuccess: (data, ...args) => {
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};