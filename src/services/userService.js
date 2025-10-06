import { userIndexApi, userCreateApi, userDeleteApi, userUpdateApi } from "../api/user";

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
    throw { code, message, errors };
  }
};

export const userDelete = async (id) => {
  try {
    await userDeleteApi(id);
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Gagal menghapus user";
    throw { code, message };
  }
};

export const userUpdate = async (id, payload) => {
  try {
    await userUpdateApi(id, payload);
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Gagal membuat user";
    const errors = err.response?.data?.errors || null;
    throw { code, message, errors };
  }
}