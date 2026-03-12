import axios from "axios";

const api = axios.create({
  baseURL: "https://taskmanager-api-tjqj.onrender.com/api"
});

export default api;
