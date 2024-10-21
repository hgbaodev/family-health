import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDocumentsQueryOptions } from "~/api/documents/get-documents";
import { api } from "~/axios/api";

export const createDocument = ({
     recordID,
     fileName,
     fileType,
     fileContent,
     uploadDate
}) => {
  return api.post(`/documents`, {
     recordID,
     fileName,
     fileType,
     fileContent,
     uploadDate
  });
};

export const useCreateDocument = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDocument,
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
