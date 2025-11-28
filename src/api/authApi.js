import api from "./api";

export const me = () => api.get("/me").then(res => res.data.data);

export const login = (email, password) =>
  api.post("/login", { email, password }).then(res => res.data.data);

export const register = (name, email, password, password_confirmation) =>
  api.post("/register", { name, email, password, password_confirmation }).then(res => res.data.data);