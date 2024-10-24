import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/axios/api";

export const getAppointments = async ({ page, size, keyword }) => {
  const response = await api.get(`/appointments`, {
    params: { 
      page,
      size,
      keyword,
    },
  });
  return response.data;
};

export const getAppointmentsQueryOptions = ({ page, size, keyword }) => {
  return queryOptions({
    queryKey: page ? ["appointments", { page, size, keyword }] : ["appointments"],
    queryFn: () => getAppointments({ page, size, keyword }),
  });
};


export const useAppointments = ({ queryConfig, page, size, keyword }) => {
  return useQuery({
    ...getAppointmentsQueryOptions({ page, size, keyword }),
    ...queryConfig,
  });
};