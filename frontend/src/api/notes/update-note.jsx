import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotesQueryOptions } from "~/api/notes/get-notes";
import { api } from "~/axios/api";

export const updateNote = (id, data) => {
  return api.put(`/notes/${id}`, data);
};

export const useUpdateNote = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateNote(id, data),
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getNotesQueryOptions.queryKey,
      });
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};