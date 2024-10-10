import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/axios/api";

export const getMedications = async ({ page, size, keyword }) => {
  const response = await api.get(`/medications`, {
    params: {
      page,
      size,
      keyword,
    },
  });
  return response.data;
};

export const getMedicationsQueryOptions = ({ page, size, keyword }) => {
  return queryOptions({
    queryKey: page ? ["medications", { page, size, keyword }] : ["medications"],
    queryFn: () => getMedications({ page, size, keyword }),
  });
};

export const useMedications = ({ queryConfig, page, size, keyword }) => {
  return useQuery({
    ...getMedicationsQueryOptions({ page, size, keyword }),
    ...queryConfig,
  });
};