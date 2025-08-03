import axios from "axios";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/userStore";

declare global {
  interface Window {
    axios: typeof axios;
  }
}

window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.interceptors.response.use((response) => response.data);

const { token } = storeToRefs(useUserStore());

const options = {
  baseURL: "https://phplaravel-1494556-5705857.cloudwaysapps.com/v1",
  headers: {
    Accept: "application/json,text/plain,*/*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token.value}`,
  },
};

export const requestAxios = axios.create(options);

requestAxios.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

requestAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const errorData = error?.response?.data;
      console.log(error);

      if (errorData?.message === "Invalid or expired token") {
        localStorage.clear();
        window.location.reload();
      }
      if (errorData?.status === 403) {
        localStorage.clear();
        window.location.reload();
      }
      return Promise.reject(errorData);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
