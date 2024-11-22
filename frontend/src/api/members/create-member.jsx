import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMembersQueryOptions } from "~/api/members/get-members";
import { api } from "~/config/api";

export const createMember = ({
  gender,
  weight,
  fullName,
  dateOfBirth,
  bloodType,
  relationship,
  height
}) => {
  return api.post(`/members`, {
    gender,
    weight,
    fullName,
    dateOfBirth,
    bloodType,
    relationship,
    height
  });
};

export const useCreateMember = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMember,
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getMembersQueryOptions.queryKey,
      });
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};