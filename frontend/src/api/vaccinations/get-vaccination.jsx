import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/axios/api";

export const getVaccinations = async ({ page, size, keyword }) => {
  const response = await api.get(`/vaccinations`, {
    params: { 
      page,
      size,
      keyword,
    },
  });
  return response.data;
};

export const getVaccinationsQueryOptions = ({ page, size, keyword }) => {
  return queryOptions({
    queryKey: page ? ["vaccinations", { page, size, keyword }] : ["vaccinations"],
    queryFn: () => getVaccinations({ page, size, keyword }),
  });
};


export const useVaccinations = ({ queryConfig, page, size, keyword }) => {
  return useQuery({
    ...getVaccinationsQueryOptions({ page, size, keyword }),
    ...queryConfig,
  });
};