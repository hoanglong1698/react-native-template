import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    skip_auth?: boolean;
    auth_optional?: boolean;
    _retry?: boolean;
  }

  export interface InternalAxiosRequestConfig {
    skip_auth?: boolean;
    auth_optional?: boolean;
    _retry?: boolean;
  }
}
