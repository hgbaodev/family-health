import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "~/config/api";
import { getEmergencyContactsQueryOptions } from "./get-emergencyContacts";

export const updateEmergencyContact  = (id, data) => {
  return api.put(`/emergencyContacts/${id}`, data);
};

export const useUpdateEmergencyContact = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateEmergencyContact(id, data),
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getEmergencyContactsQueryOptions.queryKey,
      });
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};