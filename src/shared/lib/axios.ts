import axios from "axios";
import { TOKEN_KEY } from "@/features/auth/constant/token.constant";

export const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ?? "https://exam-app.elevate-bootcamp.cloud",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
