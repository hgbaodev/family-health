import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/config/api";

export const getUsers = async ({ page="", size="", keyword="" }) => {
  const response = await api.get(`/users`, {
    params: { 
      page,
      size,
      keyword,
    },
  });
  return response.data;
};

export const getUsersQueryOptions = ({ page, size, keyword }) => {
  return queryOptions({
    queryKey: page ? ["users", { page, size, keyword }] : ["users"],
    queryFn: () => getUsers({ page, size, keyword }),
  });
};


export const useUsers = ({ queryConfig, page, size, keyword }) => {
  return useQuery({
    ...getUsersQueryOptions({ page, size, keyword }),
    ...queryConfig,
  });
};