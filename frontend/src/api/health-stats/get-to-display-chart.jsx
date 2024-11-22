import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/config/api";

export const getToDisplayChart = async ({ selectedMemberId, selectedStatType, date }) => {
  const params = {};
  if (selectedMemberId) params.selectedMemberId = selectedMemberId;
  if (selectedStatType) params.selectedStatType = selectedStatType
  if (date) params.date = date;

  const response = await api.get('/health-stats/displayChart', { params });
  return response.data;
};

export const getToDisplayChartQueryOptions = ({ selectedMemberId, selectedStatType, date }) => {
  return queryOptions({
    queryKey: selectedMemberId ? ["dataChart", { selectedMemberId, selectedStatType, date }] : ["dataChart"],
    queryFn: () => getToDisplayChart({ selectedMemberId, selectedStatType, date }),
  });
};

export const useToDisplayChart = ({ selectedMemberId, selectedStatType, date }) => {
  return useQuery({
    ...getToDisplayChartQueryOptions({ selectedMemberId, selectedStatType, date }),
    enabled: !!selectedMemberId, // Chỉ gọi API nếu có selectedMemberId
  });
};
