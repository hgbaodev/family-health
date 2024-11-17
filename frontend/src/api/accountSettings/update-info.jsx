import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/axios/api";

export const updateInfo = (data) => {
  return api.put(`/account-settings`, data);
};

export const useUpdateInfo = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: ((data) => updateInfo(data)),
      onSuccess: (data, ...args) => {
          queryClient.invalidateQueries({
                  queryKey: ['info'],
                });
        onSuccess?.(data, ...args);
      },
      onError: (error, ...args) => {
        onError?.(error, ...args);
      },
      ...restConfig,
    });
};
