import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/config/api";

export const getHealthStats = async ({ selectedMemberId, selectedStatType, date }) => {
  const params = {};
  if (selectedMemberId) params.selectedMemberId = selectedMemberId;
  if (selectedStatType) params.selectedStatType = selectedStatType
  if (date) params.date = date;

  const response = await api.get('/health-stats', { params });
  return response.data;
};

export const getHealthStatsQueryOptions = ({ selectedMemberId, selectedStatType, date }) => {
  return queryOptions({
    queryKey: selectedMemberId ? ["healthStats", { selectedMemberId, selectedStatType, date }] : ["healthStats"],
    queryFn: () => getHealthStats({ selectedMemberId, selectedStatType, date }),
  });
};

export const useHealthStats = ({ selectedMemberId, selectedStatType, date }) => {
  return useQuery({
    ...getHealthStatsQueryOptions({ selectedMemberId, selectedStatType, date }),
    enabled: !!selectedMemberId, // Chỉ gọi API nếu có selectedMemberId
  });
};
