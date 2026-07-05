import axios from "axios";

// Single axios instance for every Gaia API call.
// Point the client at your API with REACT_APP_API_URL in .env
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:4000"
});

export default api;
