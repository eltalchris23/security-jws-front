import axios from "axios";
import { isTokenExpired, logout } from "./authToken";

const api = axios.create({
    baseURL: "http://localhost:8181"
});

// Interceptor para agregar el token automaticamente
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
  
      if (token) {
        if (isTokenExpired(token)) {
          logout();
          return Promise.reject(new Error("Token expirado"));
        }
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => Promise.reject(error)
  );

export default api;