import { userIndexApi, userCreateApi, userDeleteApi } from "../api/user";

export const fetchAllUsers = async() => {
    return await userIndexApi();
};

export const userCreate = async (payload) => {
  if (!payload.email || !payload.password) {
    throw new Error("Email dan password wajib diisi");
  }

  try {
    const newUser = await userCreateApi(payload);
    return newUser;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Gagal membuat user");
  }
};

export const userDelete = async (id) => {
  try {
    await userDeleteApi(id);
  } catch (err) {
    throw new Error(err.response?.data?.message || "Gagal menghapus user");
  }
};