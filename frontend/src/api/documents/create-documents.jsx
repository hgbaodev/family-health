import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDocumentsQueryOptions } from "~/api/documents/get-documents";
import { api } from "~/axios/api";

export const createDocument = ({
  recordID,
  fileName,
  fileType,
  uploadDate,
  file
}) => {
  const formData = new FormData();
  formData.append("request", JSON.stringify({ recordID, fileName, fileType, uploadDate }));
  formData.append("file", file);
  return api.post(`/documents`,formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
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
      console.log(error);
      console.error("Error details:", error.response?.data);
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};
