import { newsIndexApi, newsCreateApi, newsDeleteApi, newsUpdateApi } from "../api/news";
import { STORAGE_BASE_URL } from "../config/env";
import ApiError from "../utils/ApiError";

export const BASE_URL = `${STORAGE_BASE_URL}/news/`;

export const fetchAllNews = async () => {
  return await newsIndexApi();
};

export const newsCreate = async (form) => {
  try {
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    const newNews = await newsCreateApi(formData);
    return newNews;
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Gagal membuat berita";
    const errors = err.response?.data?.errors || null;
    throw new ApiError(message, code, errors);
  }
};

export const newsDelete = async (id) => {
  try {
    await newsDeleteApi(id);
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Gagal menghapus berita";
    throw new ApiError(message, code);
  }
};

export const newsUpdate = async (id, form) => {
  try {
    const formData = new FormData();

    Object.entries(form).forEach(([key, val]) => {
      if (key === "image" && !(val instanceof File)) return;
      if (val !== null && val !== undefined) formData.append(key, val);
    });

    formData.append("_method", "PUT");
    await newsUpdateApi(id, formData);
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Gagal memperbarui berita";
    const errors = err.response?.data?.errors || null;
    throw new ApiError(message, code, errors);
  }
}