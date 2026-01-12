import ApiError from "@/shared/utils/ApiError";
import api from "@/shared/lib/api/axios";

export const fetchAllCategories = async () => {
  try {
    return await api.get("/categories").then(res => res.data.data);
  } catch (err) {
    throw ApiError.fromAxios(err);
  }
};

export const createCategory = async (payload) => {
  try {
    return await api.post("/categories", payload).then(res => res.data.data);
  } catch (err) {
    throw ApiError.fromAxios(err);
  }
};

export const updateCategory = async (id, payload) => {
  try {
    await api.put(`/categories/${id}`, payload);
  } catch (err) {
    throw ApiError.fromAxios(err);
  }
}

export const deleteCategory = async (id) => {
  try {
    await api.delete(`/categories/${id}`);
  } catch (err) {
    throw ApiError.fromAxios(err);
  }
};