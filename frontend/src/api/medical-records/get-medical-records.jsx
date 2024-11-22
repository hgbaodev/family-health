import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/config/api";

export const getMedicalRecords = async ({ page, size, keyword }) => {
  const response = await api.get(`/medical-records`, {
    params: {
      page,
      size,
      keyword,
    },
  });
  return response.data;
};

export const getMedicalRecordsQueryOptions = ({ page, size, keyword }) => {
  return queryOptions({
    queryKey: page ? ["medical-records", { page, size, keyword }] : ["medical-records"],
    queryFn: () => getMedicalRecords({ page, size, keyword }),
  });
};


export const useMedicalRecords = ({ queryConfig, page, size, keyword }) => {
  return useQuery({
    ...getMedicalRecordsQueryOptions({ page, size, keyword }),
    ...queryConfig,
  });
};