import axios from 'axios';

const axiosinstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

let accessToken = '';

export function setAccessToken(token) {
  accessToken = token;
}

axiosinstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosinstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error.config;
    if (error.response.status === 403 && !prevRequest.sent) {
      const respone = await axios('/api/auth/refresh');
      accessToken = respone.data.accessToken;
      prevRequest.sent = true;
      prevRequest.headers.Authorization = `Bearer ${accessToken}`;
      return axiosinstance(prevRequest);
    }
    return Promise.reject(error);
  },
);

export default axiosinstance;
