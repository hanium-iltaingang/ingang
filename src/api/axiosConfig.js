// src/api/axiosConfig.js
import axios from 'axios';

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // 백엔드 서버의 기본 URL 설정
  // 여기에 추가 설정을 할 수 있습니다. 예: timeout, headers 등
});

export default axiosInstance;
