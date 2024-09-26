import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/axios/api";

export const getMembers = ({ page, size, keyword }) => {
  return api.get(`/members`, {
    params: {
      page,
      size,
      keyword,
    },
  });
};

export const getMembersQueryOptions = ({
  page,
  size,
  keyword,
}) => {
  return queryOptions({
    queryKey: page ? ["members", { page, size, keyword }] : ["members"],
    queryFn: () => getMembers({page, size, keyword}),
  });
};

export const useMembers = ({ queryConfig, page, size, keyword }) => {
  return useQuery({
    ...getMembersQueryOptions({ page, size, keyword }),
    ...queryConfig,
  });
};
