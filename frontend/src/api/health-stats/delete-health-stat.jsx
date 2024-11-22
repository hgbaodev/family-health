import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMembersQueryOptions } from "~/api/members/get-members";
import { api } from "~/config/api";

export const deleteHealthStat = (id) => {
  return api.delete(`/health-stats/${id}`);
};

export const useDeleteHealthStat = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHealthStat,
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