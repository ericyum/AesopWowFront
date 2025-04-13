import axios from "axios";
import {isExpiredJwt} from "../utils/JwtUtils";
import {refreshToken} from "../usecases/user_usecase";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
  async (config) => {
    if (config.url && (config.url.includes('/api/v1/auth/duplicate')
      || config.url.includes('api/v1/auth/login') || config.url.includes('api/v1/auth/signup')
      || config.url.includes('/api/v1/auth/otp') || config.url.includes('/api/v1/auth/refresh'))) {
      return config;
    }
    // 예: 인증 토큰이 있다면 헤더에 추가
    const token = localStorage.getItem('accessToken');

    if (token) {
      if (isExpiredJwt(token)) {
        await refreshToken();
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    // 요청 오류 처리
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
