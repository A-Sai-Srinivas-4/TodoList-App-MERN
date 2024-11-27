import axios, { InternalAxiosRequestConfig } from "axios";

/* 
Explanation: axios is a library for making HTTP requests in JavaScript and Node.js environments.It is used for making API requests to the server. 
InternalAxiosRequestConfig is a type for AxiosRequestConfig with additional internal properties like headers and data that are used internally by Axios.
*/

// Create a reusable Axios instance for API calls
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api", // Default to localhost if env not set
  headers: {
    "Content-Type": "application/json",
  },
});
// Explanation: Create an axios instance with a base URL and default headers for API calls 

// Request interceptor (for adding tokens, etc.)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Use InternalAxiosRequestConfig here
    // Add token to headers if needed, for example:
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Explanation: Add token to headers if needed

// Response interceptor (for handling errors globally)
api.interceptors.response.use( // Explanation: intercept the response and handle errors globally.
  (response) => response.data, // Return the data directly from the response
  (error) => {
    // You can handle error globally here (e.g., logging, showing notifications)
    const errorMessage =
      error.response?.data?.message || error.message || "Unknown error";
    console.error(errorMessage);
    return Promise.reject(error);
  }
);
// Explanation: Handle errors globally and show notifications if needed

export default api;
