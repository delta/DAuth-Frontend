import axios from 'axios';
import config from '../../env.js';

export const axiosInstance = axios.create({
  baseURL: config.backendurl || 'http://localhost:3001',
  withCredentials: true
});
