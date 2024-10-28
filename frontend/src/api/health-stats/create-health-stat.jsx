import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getVaccinationsQueryOptions } from "~/api/vaccinations/get-vaccination";
import { api } from "~/axios/api";

export const CreateHealthStat = ({
  memberID,
  statType,
  statValue,
  date,
}) => {
  return api.post(`/health-stats`, {
    memberID,
    statType,
    statValue,
    date,
  });
};

export const useCreateHealthStat = (options = {}) => {
  const { onSuccess, onError, ...restConfig } = options;

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateHealthStat,
    onSuccess: (data, ...args) => {
      queryClient.invalidateQueries({
        queryKey: getVaccinationsQueryOptions.queryKey,
      });
      onSuccess?.(data, ...args);
    },
    onError: (error, ...args) => {
      onError?.(error, ...args);
    },
    ...restConfig,
  });
};
