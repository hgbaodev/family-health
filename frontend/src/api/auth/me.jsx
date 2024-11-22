import { useQuery } from "@tanstack/react-query";
import { api } from "~/config/api";

export const me = () => {
  return api.get(`/auth/me`);
};

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: me,
  });
};