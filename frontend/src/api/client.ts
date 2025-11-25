import axios from 'axios';

const API = import.meta.env.VITE_API;

export const axiosInstance = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Перехватчик, чтобы развернуть data.data
axiosInstance.interceptors.response.use(
  (response) => {
    response.data = response.data?.data ?? response.data;
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
