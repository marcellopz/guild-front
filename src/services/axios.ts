import axios from "axios";

export const getBaseUrl = () => {
  // Your logic to determine the base URL
  if (import.meta.env.MODE === "development") {
    return "http://localhost:3001";
  } else {
    return "https://guild-backend-n3vy.onrender.com";
  }
};

const axiosInstance = axios.create({
  baseURL: getBaseUrl() + "/api",
  withCredentials: true,
});

axiosInstance.defaults.withCredentials = true;

// Optional: Add global request/response interceptors
axiosInstance.interceptors.request.use((config) => {
  // e.g., Add an authorization token:
  // config.headers.Authorization = `Bearer ${token}`;
  // console.warn({ config });
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling logic (e.g., logging, showing an error message)
    // console.error({ error });
    return Promise.reject(error);
  }
);

export default axiosInstance;
