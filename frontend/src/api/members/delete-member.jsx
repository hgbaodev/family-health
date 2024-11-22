import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMembersQueryOptions } from "~/api/members/get-members";
import { api } from "~/config/api";

export const deleteMember = (id) => {
  return api.delete(`/members/${id}`);
};

export const useDeleteMember = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMember,
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