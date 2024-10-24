import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAppointmentsQueryOptions } from "~/api/appointments/get-appointment";
import { api } from "~/axios/api";

export const createAppointment = ({ memberID, time, doctor, location }) => {
  return api.post(`/appointments`, {
    memberID,
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
