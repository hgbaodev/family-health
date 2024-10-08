import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/axios/api";

export const getAllergies = async ({ page, size, keyword }) => {
  const response = await api.get(`/allergies`, {
    params: {
      page,
      size,
      keyword,
    },
  });
  return response.data;
};

export const getAllergiesQueryOptions = ({ page, size, keyword }) => {
  return queryOptions({
    queryKey: page ? ["allergies", { page, size, keyword }] : ["allergies"],
    queryFn: () => getAllergies({ page, size, keyword }),
  });
};


export const useAllergies = ({ queryConfig, page, size, keyword }) => {
  return useQuery({
    ...getAllergiesQueryOptions({ page, size, keyword }),
    ...queryConfig,
  });
};