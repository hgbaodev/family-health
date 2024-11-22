import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/config/api";

export const getAllergies = async ({ page, size, keyword, memberId }) => {
  const response = await api.get(`/allergies`, {
    params: {
      page,
      size,
      keyword,
      memberId
    },
  });
  return response.data;
};

export const getAllergiesQueryOptions = ({ page, size, keyword, memberId }) => {
  return queryOptions({
    queryKey: page ? ["allergies", { page, size, keyword, memberId }] : ["allergies"],
    queryFn: () => getAllergies({ page, size, keyword, memberId }),
  });
};


export const useAllergies = ({ queryConfig, page, size, keyword, memberId }) => {
  return useQuery({
    ...getAllergiesQueryOptions({ page, size, keyword, memberId }),
    ...queryConfig,
  });
};