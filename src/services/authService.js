import { me, login } from "../api/authApi";

export const fetchUser = async () => {
  return await me();
};

export const loginAndStore = async (email, password) => {
  const { token, user } = await login(email, password);
  localStorage.setItem("token", token);
  return user;
};

export const clearAuth = () => {
  localStorage.removeItem("token");
};