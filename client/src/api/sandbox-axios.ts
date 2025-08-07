import axios, { type AxiosInstance } from 'axios';

export const socketEndpoint: string = import.meta.env.VITE_API_SOCKET_ENDPOINT || 'http://localhost:8000/terminal';

const baseURL: string = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/sandbox';

const instance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
