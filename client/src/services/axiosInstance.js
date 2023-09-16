import axios from 'axios';

// Create a new Axios instance with custom configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // Replace with your API's base URL
  timeout: 10000, // Request timeout in milliseconds (10 seconds in this example)
  headers: {
    'Content-Type': 'application/json', // Set the default content type for requests
    // You can add other custom headers here
  },
});

// Add a request interceptor to handle request errors
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config before it is sent
    return config;
  },
  (error) => {
    // Handle request errors here
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle response errors
axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response data before it is returned
    return response;
  },
  (error) => {
    // Handle response errors here
    // For example, you can log the error or show a notification to the user
    console.error('Request failed:', error);

    // You can also re-throw the error to let the calling code handle it
    return Promise.reject(error);
  }
);

export default axiosInstance;
