import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMedicalRecordsQueryOptions } from "~/api/medical-records/get-medical-records";
import { api } from "~/config/api";

export const deleteMedicalRecord = (id) => {
  return api.delete(`/medical-records/${id}`);
};

export const useDeleteMedicalRecord = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMedicalRecord,
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getMedicalRecordsQueryOptions.queryKey,
      });
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};