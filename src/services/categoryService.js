import { categoryIndexApi, categoryCreateApi, categoryDeleteApi, categoryUpdateApi } from "../api/categoryApi";
import ApiError from "../utils/ApiError";

export const fetchAllCategories = async () => {
  return await categoryIndexApi();
};

export const categoryCreate = async (payload) => {
  try {
    const newCategory = await categoryCreateApi(payload);
    return newCategory;
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Gagal membuat kategori";
    const errors = err.response?.data?.errors || null;
    throw new ApiError(message, code, errors);
  }
};

export const categoryDelete = async (id) => {
  try {
    await categoryDeleteApi(id);
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Gagal menghapus kategori";
    throw new ApiError(message, code);
  }
};

export const categoryUpdate = async (id, payload) => {
  try {
    await categoryUpdateApi(id, payload);
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Gagal memperbarui kategori";
    const errors = err.response?.data?.errors || null;
    throw new ApiError(message, code, errors);
  }
}