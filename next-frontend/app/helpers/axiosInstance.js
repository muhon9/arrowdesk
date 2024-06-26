import axios from "axios";

const baseURL = "http://localhost:8000/v1"; // Replace with your actual base URL
const axiosInstance = axios.create({
  baseURL, // Replace with your actual base URL
  headers: {
    "Content-Type": "application/json",
  },
});
console.log("interceptors");

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    console.log("token", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      // Check if the request has already been retried or if there's no refresh token available
      if (!originalRequest._retry && localStorage.getItem("refreshToken")) {
        originalRequest._retry = true;
        try {
          const { data } = await axios.post(`${baseURL}/auth/refresh-tokens`, {
            refreshToken: localStorage.getItem("refreshToken"),
          });
          localStorage.setItem("accessToken", data.access.token);
          localStorage.setItem("refreshToken", data.refresh.token);
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.access.token}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          // Handle the error (e.g., clear tokens, redirect to login, etc.)
          return Promise.reject(err);
        }
      } else {
        // Directly reject the request if no refresh token is available or the request has been retried
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
