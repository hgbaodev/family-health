import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAppointmentsQueryOptions } from "~/api/appointments/get-appointment";
import { api } from "~/config/api";

export const deleteAppointment = (id) => {
  return api.delete(`/appointments/${id}`);
};

export const useDeleteAppointment = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAppointment,
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