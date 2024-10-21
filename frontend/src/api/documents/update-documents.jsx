import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDocumentsQueryOptions} from "~/api/documents/get-documents";
import { api } from "~/axios/api";

export const updateDocument = (id, data) => {
  return api.put(`/documents/${id}`, data);
};

export const useUpdateDocument = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateDocument(id, data),
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