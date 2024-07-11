import axios from 'axios';

const axiosWithConfig = axios.create();
let bearerToken = '';

export const setAxiosConfig = (token: string) => {
  bearerToken = token;
};

axiosWithConfig.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = 'https://hells-kitchen.onrender.com/api/v1';

  if (bearerToken !== '') {
    axiosConfig.headers.Authorization = `Bearer ${bearerToken}`;
  }

  return axiosConfig;
});

export default axiosWithConfig;
