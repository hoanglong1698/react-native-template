import axios, { AxiosInstance } from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/';

export class AxiosAPIService {
  private readonly instance: AxiosInstance;

  constructor(baseUrl?: string) {
    this.instance = axios.create({
      baseURL: baseUrl ?? API_URL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    // this.instance.interceptors.request.use(
    //   async config => {
    //     if (config.skip_auth !== true) {
    //       const accessToken = '';

    //       if (accessToken) {
    //         config.headers.Authorization = `Bearer ${accessToken}`;
    //       } else if (!config.auth_optional) {
    //         throw new Error('Unauthorized! Authentication is not available. You may need to sign in again and retry.');
    //       }
    //     }
    //     return config;
    //   },
    //   error => Promise.reject(error),
    // );
  }

  public get instanceRef(): AxiosInstance {
    return this.instance;
  }
}

const axiosAPIService = new AxiosAPIService();
export const axiosAPI = axiosAPIService.instanceRef;
