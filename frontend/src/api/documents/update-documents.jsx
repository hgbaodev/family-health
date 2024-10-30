import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDocumentsQueryOptions} from "~/api/documents/get-documents";
import { api } from "~/axios/api";

export const updateDocument = (id, data,file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("request", JSON.stringify(data));
  return api.put(`/documents/${id}`, formData,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const useUpdateDocument = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data,file }) => updateDocument(id, data,file),
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