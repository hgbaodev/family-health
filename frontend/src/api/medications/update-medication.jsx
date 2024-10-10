import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMedicationsQueryOptions } from "~/api/medications/get-medications";
import { api } from "~/axios/api";

export const updateMedication = (id, data) => {
  return api.put(`/medications/${id}`, data);
};

export const useUpdateMedication = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateMedication(id, data),
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getMedicationsQueryOptions.queryKey,
      });
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};