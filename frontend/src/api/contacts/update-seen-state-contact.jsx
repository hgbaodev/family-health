import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/config/api";
import { getContactsQueryOptions } from "./get-contacts";

export const updateSeenStateContact = (id) => {
  return api.put(`/contacts/${id}`);
};

export const useUpdateSeenStateContact = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSeenStateContact,
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getContactsQueryOptions.queryKey,
      });
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};