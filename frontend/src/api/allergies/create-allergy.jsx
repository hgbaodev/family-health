import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllergiesQueryOptions } from "~/api/allergies/get-allergies";
import { api } from "~/config/api";

export const createAllergy = ({
  allergyType,
  severity,
  symptoms,
  memberId,
}) => {
  return api.post(`/allergies`, {
    allergyType,
    severity,
    symptoms,
    memberId,
  });
};

export const useCreateAllergy = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAllergy,
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getAllergiesQueryOptions.queryKey,
      });
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};
