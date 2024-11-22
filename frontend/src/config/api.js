import Axios from "axios";
import { BACKEND_ENDPOINT } from "~/config/env";

function authRequestInterceptor(config) {
  if (config.headers) {
    config.headers.Accept = "application/json";
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;
  }

  config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: BACKEND_ENDPOINT,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
