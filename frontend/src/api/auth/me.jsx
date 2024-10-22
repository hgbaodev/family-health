import { useQuery } from "@tanstack/react-query";
import { api } from "~/axios/api";

export const me = () => {
  return api.get(`/auth/me`);
};

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: me,
  });
};