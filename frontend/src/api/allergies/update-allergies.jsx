import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllergiesQueryOptions} from "~/api/allergies/get-allergies";
import { api } from "~/config/api";

export const updateAllergy = (id, data) => {
  return api.put(`/allergies/${id}`, data);
};

export const useUpdateAllergy = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateAllergy(id, data),
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