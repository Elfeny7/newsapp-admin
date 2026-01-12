import ApiError from "@/shared/utils/ApiError";
import api from "@/shared/lib/api/axios";

export const fetchUser = async () => {
  try {
    return await api.get("/me").then(res => res.data.data);
  } catch (err) {
    throw ApiError.fromAxios(err);
  }
};

export const loginAndStore = async (email, password) => {
  try {
    const { token, user } = await api.post("/login", { email, password }).then(res => res.data.data);
    localStorage.setItem("token", token);
    return user;
  } catch (err) {
    throw ApiError.fromAxios(err);
  }
};

export const registerAndStore = async (name, email, password, password_confirmation) => {
  try {
    const { token, user } = await api.post("/register", { name, email, password, password_confirmation }).then(res => res.data.data);
    localStorage.setItem("token", token);
    return user;
  } catch (err) {
    throw ApiError.fromAxios(err);
  }
};

export const clearAuth = () => {
  localStorage.removeItem("token");
};