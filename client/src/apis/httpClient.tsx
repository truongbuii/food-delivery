import axios, { AxiosError, CreateAxiosDefaults, HttpStatusCode } from "axios";
import { useAuthStore } from "@/stores";
import { AUTH_STORAGE_KEY, PATHNAME } from "@/configs";
import { getNewTokenService } from "@/services";

let isRefreshing = false;
let requestQueue: (() => void)[] = [];

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

  client.interceptors.request.use(
    (config) => {
      const accessToken = useAuthStore.getState().token;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response) => response.data,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === HttpStatusCode.Unauthorized &&
        !originalRequest._retry
      ) {
        if (originalRequest.url.includes(PATHNAME.SIGN_IN)) {
          return Promise.reject(error.response.data || error);
        }

        if (isRefreshing) {
          // Add request to queue and resolve later
          return new Promise((resolve, reject) => {
            requestQueue.push(() =>
              client(originalRequest).then(resolve).catch(reject)
            );
          });
        }

        // Mark the request as being retried
        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const { setTokens } = useAuthStore.getState();
          const resp = await getNewTokenService();
          if (resp && resp.data) {
            setTokens(resp.data.token);
          }

          // Retry queued requests
          requestQueue.forEach((callback) => callback());
          requestQueue = [];
          isRefreshing = false;

          // Retry original request
          return client(originalRequest);
        } catch (refreshError: any) {
          isRefreshing = false;
          requestQueue = [];
          localStorage.removeItem(AUTH_STORAGE_KEY);
          window.location.href = PATHNAME.SIGN_IN;
          const errorResponse = refreshError.response
            ? {
                ...refreshError.response.data,
                message: refreshError.response.data.message,
              }
            : refreshError;
          return Promise.reject(errorResponse);
        }
      }

      if (error.response?.status === HttpStatusCode.Forbidden) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
        return Promise.reject(error.response.data);
      }

      return Promise.reject(error.response?.data || error);
    }
  );

  return client;
};

export default createHttpClient;
