import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMedicalRecordsQueryOptions} from "~/api/medical-records/get-medical-records";
import { api } from "~/config/api";

export const updateMedicalRecord = (id, data) => {
  return api.put(`/medical-records/${id}`, data);
};

export const useUpdateMedicalRecord = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateMedicalRecord(id, data),
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