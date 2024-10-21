import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/axios/api";

export const getDocuments = async ({ page, size, keyword }) => {
  const response = await api.get(`/documents`, {
    params: {
      page,
      size,
      keyword,
    },
  });
  return response.data;
};

export const getDocumentsQueryOptions = ({ page, size, keyword }) => {
  return queryOptions({
    queryKey: page ? ["documents", { page, size, keyword }] : ["documents"],
    queryFn: () => getDocuments({ page, size, keyword }),
  });
};


export const useDocuments = ({ queryConfig, page, size, keyword }) => {
  return useQuery({
    ...getDocumentsQueryOptions({ page, size, keyword }),
    ...queryConfig,
  });
};