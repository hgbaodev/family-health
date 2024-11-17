import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotesQueryOptions } from "~/api/notes/get-notes";
import { api } from "~/axios/api";

export const createNote = ({ title, content, createAt,noteIndex }) => {
  return api.post(`/notes`, {
    title,
    content,
    createAt,
    noteIndex,
  });
};

export const useCreateNote = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getNotesQueryOptions.queryKey,
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
