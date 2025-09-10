import axios from "axios";
import { useMemo } from "react";

const useAxios = () => {
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5000",
      withCredentials: true
    });
    
    // Add request interceptor to log the full URL
    instance.interceptors.request.use((config) => {
      console.log('Making request to:', config.baseURL + config.url);
      return config;
    });
    
    return instance;
  }, []);
  return axiosInstance;
};

export default useAxios;
