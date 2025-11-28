import * as userApi from "../api/userApi";
import ApiError from "../utils/ApiError";

export const fetchAllUsers = async () => {
  try {
    return await userApi.fetchAll();
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Failed to fetch users";
    throw new ApiError(message, code);
  }
};

export const createUser = async (payload) => {
  try {
    return await userApi.create(payload);
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Failed to create user";
    const errors = err.response?.data?.errors || null;
    throw new ApiError(message, code, errors);
  }
};

export const updateUser = async (id, payload) => {
  try {
    await userApi.update(id, payload);
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Failed to update user";
    const errors = err.response?.data?.errors || null;
    throw new ApiError(message, code, errors);
  }
}

export const deleteUser = async (id) => {
  try {
    await userApi.remove(id);
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Failed to delete user";
    throw new ApiError(message, code);
  }
};