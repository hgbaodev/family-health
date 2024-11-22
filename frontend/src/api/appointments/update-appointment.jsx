import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAppointmentsQueryOptions } from "~/api/appointments/get-appointment";
import { api } from "~/config/api";

export const updateAppointment = (id, data) => {
  return api.put(`/appointments/${id}`, data);
};

export const useUpdateAppointment = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateAppointment(id, data),
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getAppointmentsQueryOptions.queryKey,
      });
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};