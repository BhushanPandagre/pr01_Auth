import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: "http://localhost:5000/api/",
});

// Request interceptor to include Authorization header dynamically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API methods

/**
 * Register a new user
 * @param {Object} userData - User data (name, email, password)
 * @returns {Promise} Axios response
 */
export const registerUser = async (userData) => {
  try {
    const response = await API.post("auth/register", userData);
    return response.data; // Return the data part of the response
  } catch (error) {
    handleError(error); // Handle errors
  }
};

/**
 * Login user
 * @param {Object} userData - Login data (email, password)
 * @returns {Promise} Axios response
 */
export const loginUser = async (userData) => {
  try {
    const response = await API.post("auth/login", userData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getProfile = async (token) => {
  try {
    const response = await axios.get("http://localhost:5000/api/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`, // Send token as Bearer
      },
    });
    console.log("Profile data received:", response.data); // Debug API response
    return response.data; // Return the response data directly
  } catch (error) {
    console.error(
      "Error fetching profile:",
      error.response?.data || error.message
    );
    throw error; // Rethrow error to handle it in the caller
  }
};

// Generic error handler
const handleError = (error) => {
  // Extract relevant information for debugging
  if (error.response) {
    console.error(
      `API Error: ${error.response.status} - ${error.response.data.message}`
    );
    throw new Error(error.response.data.message || "An error occurred."); // Throw specific error message
  } else if (error.request) {
    console.error("No response received from server:", error.request);
    throw new Error("No response received from server.");
  } else {
    console.error("Error in API request:", error.message);
    throw new Error(error.message);
  }
};
