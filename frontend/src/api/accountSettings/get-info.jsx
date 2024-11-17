import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/axios/api";

export const getInfo = async () => {
  const response = await api.get(`/account-settings`);
  return response.data;
};

export const useGetInfo = () => {
  return useQuery({
    queryKey: ['info'],
    queryFn: getInfo,
  });
};

