import axios from "axios";

const BASE_URL = "https://shop-geeks.up.railway.app/api/v1";

const $mainApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const $authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

$authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

$authApi.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      try {
        const { data } = await $authApi.post("/auth/refresh");
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken);
        }
        return $authApi.request(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  },
);

export { $mainApi, $authApi };
