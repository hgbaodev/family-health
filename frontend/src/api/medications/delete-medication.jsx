import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMedicationsQueryOptions } from "~/api/medications/get-medications";
import { api } from "~/axios/api";

export const deleteMedication = (id) => {
  return api.delete(`/medications/${id}`);
};

export const useDeleteMedication = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMedication,
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