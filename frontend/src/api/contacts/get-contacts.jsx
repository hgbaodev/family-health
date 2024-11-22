import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/config/api";

export const getContacts = async ({ page="", size="", keyword="" }) => {
  const response = await api.get(`/contacts`, {
    params: { 
      page,
      size,
      keyword,
    },
  });
  return response.data;
};

export const getContactsQueryOptions = ({ page, size, keyword }) => {
  return queryOptions({
    queryKey: page ? ["contacts", { page, size, keyword }] : ["contacts"],
    queryFn: () => getContacts({ page, size, keyword }),
  });
};


export const useContacts = ({ queryConfig, page, size, keyword }) => {
  return useQuery({
    ...getContactsQueryOptions({ page, size, keyword }),
    ...queryConfig,
  });
};