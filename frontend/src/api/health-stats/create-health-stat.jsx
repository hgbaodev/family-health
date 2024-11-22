import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getVaccinationsQueryOptions } from "~/api/vaccinations/get-vaccination";
import { api } from "~/config/api";

export const CreateHealthStat = ({
  memberId,
  statType,
  statValue,
  date,
}) => {
  return api.post(`/health-stats`, {
    memberId,
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
