import { queryOptions, useQuery } from "@tanstack/react-query";
import { api } from "~/axios/api";

export const getNotes = async ({ page, size, keyword }) => {
     const response = await api.get(`/notes`, {
       params: {
         page,
         size,
         keyword,
       },
     });
     return response.data;
   };
   
   export const getNotesQueryOptions = ({ page, size, keyword }) => {
     return queryOptions({
       queryKey: page ? ["notes", { page, size, keyword }] : ["notes"],
       queryFn: () => getNotes({ page, size, keyword }),
     });
   };
   
   
   export const useNotes = ({ queryConfig, page, size, keyword }) => {
     return useQuery({
       ...getNotesQueryOptions({ page, size, keyword }),
       ...queryConfig,
     });
   };