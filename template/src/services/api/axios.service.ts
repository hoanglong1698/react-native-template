import './axios.d';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { setupRequestInterceptor } from './request.interceptor';
import { setupResponseInterceptor } from './response.interceptor';

export const API_URL = 'https://jsonplaceholder.typicode.com/';

export interface CustomAxiosInstance extends Omit<AxiosInstance, 'get' | 'post' | 'put' | 'delete' | 'patch'> {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

export class AxiosAPIService {
  private readonly instance: AxiosInstance;

  constructor(baseUrl?: string) {
    this.instance = axios.create({
      baseURL: baseUrl ?? API_URL,
      timeout: 30000,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    setupRequestInterceptor(this.instance);
    setupResponseInterceptor(this.instance);
  }

  public get instanceRef(): CustomAxiosInstance {
    return this.instance as unknown as CustomAxiosInstance;
  }
}

const axiosAPIService = new AxiosAPIService();
export const axiosAPI = axiosAPIService.instanceRef;
