import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllergiesQueryOptions } from "~/api/allergies/get-allergies";
import { api } from "~/config/api";

export const deleteAllergy = (id) => {
  return api.delete(`/allergies/${id}`);
};

export const useDeleteAllergy = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllergy,
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getAllergiesQueryOptions.queryKey,
      });
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};