import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getVaccinationsQueryOptions } from "~/api/vaccinations/get-vaccination";
import { api } from "~/axios/api";

export const createVaccination = ({
  memberID,
  vaccineName,
  dateAdministered,
}) => {
  return api.post(`/vaccinations`, {
    memberID,
    vaccineName,
    dateAdministered,
  });
};

export const useCreateVaccination = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVaccination,
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
