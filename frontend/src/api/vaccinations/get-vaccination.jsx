import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/config/api";

export const getVaccinations = async ({ page, size, keyword, memberId }) => {
  const response = await api.get(`/vaccinations`, {
    params: { 
      page,
      size,
      keyword,
      memberId
    },
  });
  return response.data;
};

export const getVaccinationsQueryOptions = ({ page, size, keyword, memberId }) => {
  return queryOptions({
    queryKey: page ? ["vaccinations", { page, size, keyword, memberId }] : ["vaccinations"],
    queryFn: () => getVaccinations({ page, size, keyword, memberId }),
  });
};


export const useVaccinations = ({ queryConfig, page, size, keyword, memberId }) => {
  return useQuery({
    ...getVaccinationsQueryOptions({ page, size, keyword, memberId }),
    ...queryConfig,
  });
};