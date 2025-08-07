import axios from "axios";
// import Cookies from 'universal-cookie';

// const cookies = new Cookies();
const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
});
// API.interceptors.request.use(
//   (config) => {
//     const token = cookies.get('token');
//     console.log(token);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       cookies.remove('token');
//       cookies.remove('user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

export default API;