import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAppointmentsQueryOptions } from "~/api/appointments/get-appointment";
import { api } from "~/config/api";

export const createAppointment = ({ memberId, time, doctor, location }) => {
  return api.post(`/appointments`, {
    memberId,
    time,
    doctor,
    location,
  });
};

export const useCreateAppointment = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAppointment,
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
