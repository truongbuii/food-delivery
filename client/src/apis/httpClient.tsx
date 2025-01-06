import axios, { AxiosError, CreateAxiosDefaults, HttpStatusCode } from "axios";
import { useAuthStore } from "@/stores";
import { IApiErrorResponse } from "@/interfaces";
import { AUTH_STORAGE_KEY, PATHNAME } from "@/configs";

// Create an instance of axios with optional config
const createHttpClient = (config?: CreateAxiosDefaults) => {
  const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...(config?.headers || {}),
    },
    withCredentials: true,
  });

  // Request interceptor to add Authorization header
  client.interceptors.request.use(
    (config) => {
      const accessToken = useAuthStore.getState().token;
      console.log("Using Token:", accessToken);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle errors
  client.interceptors.response.use(
    (response) => {
      return response.data;
    },
    async (error) => {
      if (error.code === "ERR_NETWORK" || error.code === "ERR_BAD_RESPONSE") {
        return Promise.reject({
          message: "Network or server error. Please try again",
        } as IApiErrorResponse);
      }
      if (error.response?.status === HttpStatusCode.Forbidden) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        return Promise.reject(error.response.data);
      }
      if (
        error.response &&
        error.response?.status === HttpStatusCode.Unauthorized
      ) {
        if (error.config.url.includes(PATHNAME.SIGN_IN)) {
          return Promise.reject(error.response.data || error);
        }
        // const { setTokens } = useAuthStore.getState();
        // setTokens("");
      }
      return Promise.reject(error.response.data || error);
    }
  );
  return client;
};

export default createHttpClient;
