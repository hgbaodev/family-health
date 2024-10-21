import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMedicalRecordsQueryOptions } from "~/api/medicalRecords/get-medical-records";
import { api } from "~/axios/api";

export const createMedicalRecord = ({
     memberID,
     date,
     doctor,
     symptoms,
     diagnosis,
     treatment,
     facilityName
}) => {
  return api.post(`/medical-records`, {
     memberID,
     date,
     doctor,
     symptoms,
     diagnosis,
     treatment,
     facilityName
  });
};

export const useCreateMedicalRecord = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMedicalRecord,
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
