import { userIndexApi, userCreateApi, userDeleteApi, userUpdateApi } from "../api/user";
import ApiError from "../utils/ApiError";

export const fetchAllUsers = async () => {
  return await userIndexApi();
};

export const userCreate = async (payload) => {
  try {
    const newUser = await userCreateApi(payload);
    return newUser;
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Gagal membuat user";
    const errors = err.response?.data?.errors || null;
    throw new ApiError(message, code, errors);
  }
};

export const userDelete = async (id) => {
  try {
    await userDeleteApi(id);
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Gagal menghapus user";
    throw new ApiError(message, code);
  }
};

export const userUpdate = async (id, payload) => {
  try {
    await userUpdateApi(id, payload);
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Gagal memperbarui user";
    const errors = err.response?.data?.errors || null;
    throw new ApiError(message, code, errors);
  }
}