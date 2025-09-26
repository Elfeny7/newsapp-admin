import api from "./axios";

export const userIndexApi = async () => api.get("/users").then(res => res.data.data);