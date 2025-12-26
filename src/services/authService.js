import * as authApi from "../api/authApi";
import ApiError from "../utils/ApiError";

export const fetchUser = async () => {
  try {
    return await authApi.me();
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Failed to fetch user";
    throw new ApiError(message, code);
  }
};

export const loginAndStore = async (email, password) => {
  try {
    const { token, user } = await authApi.login(email, password);
    localStorage.setItem("token", token);
    return user;
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Failed to login";
    const errors = err.response?.data?.errors || null;
    throw new ApiError(message, code, errors);
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