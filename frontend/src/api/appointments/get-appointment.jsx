import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/axios/api";

export const getAppointments = async ({ page, size, keyword, memberID }) => {
  const response = await api.get(`/appointments`, {
    params: { 
      page,
      size,
      keyword,
      memberID
    },
  });
  return response.data;
};

export const getAppointmentsQueryOptions = ({ page, size, keyword, memberID }) => {
  return queryOptions({
    queryKey: page ? ["appointments", { page, size, keyword, memberID }] : ["appointments"],
    queryFn: () => getAppointments({ page, size, keyword, memberID }),
  });
};


export const useAppointments = ({ queryConfig, page, size, keyword, memberID }) => {
  return useQuery({
    ...getAppointmentsQueryOptions({ page, size, keyword, memberID }),
    ...queryConfig,
  });
};