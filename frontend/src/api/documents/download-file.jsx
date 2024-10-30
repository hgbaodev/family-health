  import { queryOptions, useQuery } from "@tanstack/react-query";
  import { api } from "~/axios/api";

  export const downloadFile = async ({ path }) => {
    const response = await api.get(path, {
      responseType: "blob", 
    });
    if(!response){
      throw new Error("Failed to download file.");
    }
    return response;
  };

  export const getDownloadFileQueryOptions = ({ path }) => {
    return queryOptions({ 
      queryKey: path ? ["downloadFile", { path }] : ["downloadFile"],
      queryFn: () => downloadFile({ path }),
    });
  };

  export const useDownloadFile = ({ queryConfig, path }) => {
    return useQuery({
      ...getDownloadFileQueryOptions({path}),
      ...queryConfig,
    });
  };
