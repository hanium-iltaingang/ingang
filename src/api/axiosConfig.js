// src/api/axiosConfig.js

import axios from 'axios';

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080'
});

export default axiosInstance;
