import { useQuery } from "@tanstack/react-query";
import { api } from "~/config/api";

export const me = () => {
  return api.get(`/auth/me`).then((res) => res.data);
};

export const useMe = (option) => {
  return useQuery({
    queryKey: ['me'],
    queryFn: me,
    ...option,
  });
};