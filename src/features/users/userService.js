import ApiError from "@/shared/utils/ApiError";
import api from "@/shared/lib/api/axios";

export const fetchAllUsers = async () => {
  try {
    return await api.get("/users").then(res => res.data.data);
  } catch (err) {
    throw ApiError.fromAxios(err);
  }
};

export const createUser = async (payload) => {
  try {
    return await api.post("/users", payload).then(res => res.data.data);
  } catch (err) {
    throw ApiError.fromAxios(err);
  }
};

export const updateUser = async (id, payload) => {
  try {
    await api.put(`/users/${id}`, payload);
  } catch (err) {
    throw ApiError.fromAxios(err);
  }
}

export const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`);
  } catch (err) {
    throw ApiError.fromAxios(err);
  }
};