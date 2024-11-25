import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/config/api";

export const countContactsReceivedToday = async () => {
  const response = await api.get(`contacts/contacts-received-today`);
  console.log("Dữ liệu Contacts:", response.data);
  return response.data;
};

export const getContactsQueryOptions = () => {
  return queryOptions({
    queryKey: ["contactQuantity"],  
    queryFn: countContactsReceivedToday,
  });
};

export const useCountContactsReceivedToday = () => {
  return useQuery({
    ...getContactsQueryOptions(),
  });
};
