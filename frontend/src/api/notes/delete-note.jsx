import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotesQueryOptions } from "~/api/notes/get-notes";
import { api } from "~/axios/api";

export const deleteNote = (id) => {
  return api.delete(`/notes/${id}`);
};

export const useDeleteNote = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNote,
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