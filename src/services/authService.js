import { meApi, loginApi } from "../api/auth";

export const fetchUser = async () => {
  return await meApi();
};

export const loginAndStore = async (email, password) => {
  const { token, user } = await loginApi(email, password);
  localStorage.setItem("token", token);
  return user;
};

export const clearAuth = () => {
  localStorage.removeItem("token");
};