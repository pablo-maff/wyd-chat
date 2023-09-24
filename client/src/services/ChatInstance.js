import axios from 'axios';

// Create a new Axios instance with custom configuration
let ChatInstance = axios.create({
  baseURL: '/api',
  timeout: 10000, // Request timeout in milliseconds (10 seconds in this example)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to handle request errors
ChatInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config before it is sent
    const user = localStorage.getItem('user')

    if (user) {
      const token = JSON.parse(user).token
      config.headers.Authorization = `Bearer ${token}`
    }

    return config;
  },
  (error) => {
    console.error(`${error.name}: ${error.message}`);

    // Handle request errors here
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle response errors
ChatInstance.interceptors.response.use(
  (response) => {
    // You can modify the response data before it is returned
    return response;
  },
  (error) => {
    // Handle response errors here
    console.error(`${error.name}: ${error.message}`);

    // TODO: Trigger notification here

    // You can also re-throw the error to let the calling code handle it
    return Promise.reject(error);
  }
);

export default ChatInstance;
