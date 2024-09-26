import Axios from "axios";
import { BACKEND_ENDPOINT } from "~/config/env";

function authRequestInterceptor(config) {
  if (config.headers) {
    config.headers.Accept = "application/json";
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
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
    console.log(error);
    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams();
      const redirectTo = searchParams.get("redirectTo");
      window.location.href = `/auth/login?redirectTo=${redirectTo}`;
    }

    return Promise.reject(error);
  }
);
