import axios from "axios";
// import store from "../store";
// import { logout, updateToken } from "../redux/authSlice";


const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Backend URL
    withCredentials: true,
});

// API.interceptors.request.use((config) => {
//     const token = store.getState().auth.token;
//     if (token && config.headers) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// }, (error) => {
//     return Promise.reject(error);
// });

// API.interceptors.response.use(
//     (res) => res,
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 const res = await API.post("/api/auth/refresh_token");
//                 store.dispatch(updateToken(res.data.token));
//                 originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
//                 return API(originalRequest);
//             } catch (err) {
//                 store.dispatch(logout());
//                 return Promise.reject(err);
//             }
//         }
//         return Promise.reject(error);
//     }
// );

export default API;