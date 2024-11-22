import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMembersQueryOptions } from "~/api/members/get-members";
import { api } from "~/config/api";

export const updateHealthStat = (id, data) => {
  return api.put(`/health-stats/${id}`, data);
};

export const useUpdateHealthStat = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateHealthStat(id, data),
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getMembersQueryOptions.queryKey,
      });
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};