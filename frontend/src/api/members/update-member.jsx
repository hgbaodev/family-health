import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMembersQueryOptions } from "~/api/members/get-members";
import { api } from "~/config/api";

export const updateMember = (id, data) => {
  return api.put(`/members/${id}`, data);
};

export const useUpdateMember = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateMember(id, data),
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