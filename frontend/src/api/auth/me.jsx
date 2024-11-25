import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { api } from "~/config/api";

export const me = () => {
  return api.get(`/auth/me`).then((res) => res.data);
};

export const useMe = (option) => {
  const token = Cookies.get("token");
  return useQuery({
    queryKey: ['me'],
    queryFn: me,
    enabled: !!token,
    ...option,
  });
};