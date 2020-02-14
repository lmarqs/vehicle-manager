import axiosRaw from "axios";

export const apiClient = axiosRaw.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    Accept: "application/json",
  },
});
