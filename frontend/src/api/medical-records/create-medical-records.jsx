import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMedicalRecordsQueryOptions } from "~/api/medical-records/get-medical-records";
import { api } from "~/config/api";

export const createMedicalRecord = ({
  memberId,
  date,
  doctor,
  symptoms,
  diagnosis,
  treatment,
  facilityName,
  medications,
  documents,
}) => {
  return api.post(`/medical-records`, {
    memberId,
    date,
    doctor,
    symptoms,
    diagnosis,
    treatment,
    facilityName,
    medications,
    documents,
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
