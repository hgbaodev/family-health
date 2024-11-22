import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/config/api";

export const getAppointments = async ({ page, size, keyword, memberId }) => {
  const response = await api.get(`/appointments`, {
    params: { 
      page,
      size,
      keyword,
      memberId
    },
  });
  return response.data;
};

export const getAppointmentsQueryOptions = ({ page, size, keyword, memberId }) => {
  return queryOptions({
    queryKey: page ? ["appointments", { page, size, keyword, memberId }] : ["appointments"],
    queryFn: () => getAppointments({ page, size, keyword, memberId }),
  });
};


export const useAppointments = ({ queryConfig, page, size, keyword, memberId }) => {
  return useQuery({
    ...getAppointmentsQueryOptions({ page, size, keyword, memberId }),
    ...queryConfig,
  });
};