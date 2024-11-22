import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getVaccinationsQueryOptions } from "~/api/vaccinations/get-vaccination";
import { api } from "~/config/api";

export const updateVaccination = (id, data) => {
  return api.put(`/vaccinations/${id}`, data);
};

export const useUpdateVaccination = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateVaccination(id, data),
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getVaccinationsQueryOptions.queryKey,
      });
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};