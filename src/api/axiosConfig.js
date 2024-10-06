// src/api/axiosConfig.js

import axios from 'axios';

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: 'http://43.200.40.144:8080'
});

export default axiosInstance;
