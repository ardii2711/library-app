import axios from "axios";

const axiosWithConfig = axios.create();

axiosWithConfig.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = "https://hells-kitchen.onrender.com/api/v1";
  return axiosConfig;
});

export default axiosWithConfig;
