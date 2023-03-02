import axios from "axios";

const Api = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  timeout: 10000,
  params: {},
});

Api.interceptors.request.use();

export default Api;
