import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/config/api";
import { getUsersQueryOptions } from "./get-users";

export const updateBlockStateUser = (id) => {
  return api.put(`/users/${id}`);
};

export const useUpdateBlockStateUser = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBlockStateUser,
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getUsersQueryOptions.queryKey,
      });
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};