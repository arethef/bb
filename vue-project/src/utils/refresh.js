import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
const refresh = async (config) => {
  const accessToken = Cookies.get("Authentication");
  const refreshToken = Cookies.get("Refresh");
};
