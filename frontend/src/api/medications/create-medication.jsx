import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "~/axios/api";
import { getMedicationsQueryOptions } from "./get-medications";

export const createMedication = ({
        recordID,
        name,
        frequency,
        startDate,
        endDate,
        note
    }) => {
        return api.post('/medications', {
                recordID,
                name,
                frequency,
                startDate,
                endDate,
                note
            });
        };

export const useCreateMedication = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMedication,
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