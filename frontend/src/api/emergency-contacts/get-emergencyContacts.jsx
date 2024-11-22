import { api } from "~/config/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getEmergencyContacts  = async ({ page, size, keyword }) => {
  const response = await api.get(`/emergencyContacts`, {
    params: {
      page,
      size,
      keyword,
    },
  });
  return response.data;
};

export const getEmergencyContactsQueryOptions = ({ page, size, keyword }) => {
  return queryOptions({
    queryKey: page ? ["emergencyContacts", { page, size, keyword }] : ["emergencyContacts"],
    queryFn: () => getEmergencyContacts({ page, size, keyword }),
  });
};


export const useEmergencyContacts = ({ queryConfig, page, size, keyword }) => {
  return useQuery({
    ...getEmergencyContactsQueryOptions({ page, size, keyword }),
    ...queryConfig,
  });
};