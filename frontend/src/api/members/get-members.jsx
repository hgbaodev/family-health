import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/config/api";

export const getMembers = async ({ page="", size="", keyword="" }) => {
  const response = await api.get(`/members`, {
    params: { 
      page,
      size,
      keyword,
    },
  });
  return response.data;
};

export const getMembersQueryOptions = ({ page, size, keyword }) => {
  return queryOptions({
    queryKey: page ? ["members", { page, size, keyword }] : ["members"],
    queryFn: () => getMembers({ page, size, keyword }),
  });
};


export const useMembers = ({ queryConfig, page, size, keyword }) => {
  return useQuery({
    ...getMembersQueryOptions({ page, size, keyword }),
    ...queryConfig,
  });
};


export const getMembersByUser = async () => {
  const response = await api.get(`/members/all`);
  return response.data;
};

export const useMembersByUser = () => {
  return useQuery({
    queryKey: ["membersByUser"],
    queryFn: getMembersByUser,
  });
}
