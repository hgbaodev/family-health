import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDocumentsQueryOptions } from "~/api/documents/get-documents";
import { api } from "~/axios/api";

export const deleteDocument = (id) => {
  return api.delete(`/documents/${id}`);
};

export const useDeleteDocument = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDocument,
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getDocumentsQueryOptions.queryKey,
      });
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};