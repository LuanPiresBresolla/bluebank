import axios, { AxiosError } from "axios";
import { signOut } from "../context/Auth";

export const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.response.use(response => response, (error: AxiosError) => {
  if (error.response?.status === 401) {
    signOut();
  }

  return Promise.reject(error);
});