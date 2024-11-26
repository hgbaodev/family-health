import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/config/api";

export const getMedicalRecords = async ({ page, size, keyword, memberId }) => {
  const response = await api.get(`/medical-records`, {
    params: {
      page,
      size,
      keyword,
      memberId
    },
  });
  return response.data;
};

export const getMedicalRecordsQueryOptions = ({ page, size, keyword, memberId }) => {
  return queryOptions({
    queryKey: page ? ["medical-records", { page, size, keyword, memberId }] : ["medical-records"],
    queryFn: () => getMedicalRecords({ page, size, keyword, memberId }),
  });
};


export const useMedicalRecords = ({ queryConfig, page, size, keyword, memberId }) => {
  return useQuery({
    ...getMedicalRecordsQueryOptions({ page, size, keyword, memberId }),
    ...queryConfig,
  });
};