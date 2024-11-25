import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/config/api";

export const countUserCreatedToday = async () => {
  const response = await api.get(`users/users-created-today`);
  console.log("Dữ liệu Users:", response.data);
  return response.data;
};

export const getUsersQueryOptions = () => {
  return queryOptions({
    queryKey: ["userQuantity"],  
    queryFn: countUserCreatedToday,
  });
};

export const useCountUsersCreatedToday = () => {
  return useQuery({
    ...getUsersQueryOptions(),
  });
};
