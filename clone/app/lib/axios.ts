import axios from "axios";

export const axiosSet = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  validateStatus: (state) => {
    return state > 99 && state < 399;
  },
});
