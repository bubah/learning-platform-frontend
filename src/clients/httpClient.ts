// src/api/HttpClient.ts

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import sessionManager from "../features/auth/SessionManager";

export class HttpClient {
  private readonly instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    this.instance.interceptors.request.use(async (config) => {
      const token = sessionManager.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  get<T>(url: string, config?: AxiosRequestConfig) {
    const mergedConfig = this.mergeHeaders(config);
    return this.instance.get<T>(url, mergedConfig);
  }

  post<T, G>(url: string, data?: G, config?: AxiosRequestConfig) {
    const mergedConfig = this.mergeHeaders(config);
    return this.instance.post<T>(url, data, mergedConfig);
  }

  put<T, G>(url: string, data?: G, config?: AxiosRequestConfig) {
    const mergedConfig = this.mergeHeaders(config);
    return this.instance.put<T>(url, data, mergedConfig);
  }

  delete<T>(url: string, config?: AxiosRequestConfig) {
    const mergedConfig = this.mergeHeaders(config);
    return this.instance.delete<T>(url, mergedConfig);
  }

  patch<T, G>(url: string, data?: G, config?: AxiosRequestConfig) {
    const mergedConfig = this.mergeHeaders(config);
    return this.instance.patch<T>(url, data, mergedConfig);
  }

  private mergeHeaders(config?: AxiosRequestConfig): AxiosRequestConfig {
    const mergedHeaders = {
      ...config?.headers,
      Authorization: `Bearer ${sessionManager.accessToken}`,
    };

    return {
      ...config,
      headers: mergedHeaders,
    };
  }
}

const baseUrl = import.meta.env.VITE_API_BASE_URL; // Or hardcode for now
export const httpClient = new HttpClient(baseUrl);
