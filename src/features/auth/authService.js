import * as authApi from "@/api/authApi";
import ApiError from "@/shared/utils/ApiError";
import api from "@/shared/lib/api/axios";

export const fetchUser = async () => {
  try {
    const res = await api.get("/me");
    return res.data.data;
  } catch (err) {
    throw ApiError.fromAxios(err);
  }
};

export const loginAndStore = async (email, password) => {
  try {
    const { token, user } = await authApi.login(email, password);
    localStorage.setItem("token", token);
    return user;
  } catch (err) {
    throw ApiError.fromAxios(err);
  }
};

export const registerAndStore = async (name, email, password, passwordConfirmation) => {
  try {
    const { token, user } = await authApi.register(name, email, password, passwordConfirmation);
    localStorage.setItem("token", token);
    return user;
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Failed to register";
    const error = err.response?.data?.error || null;
    throw new ApiError(message, code, error);
  }
};

export const clearAuth = () => {
  localStorage.removeItem("token");
};