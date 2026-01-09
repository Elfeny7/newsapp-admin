import * as newsApi from "@/api/newsApi";
import { STORAGE_BASE_URL } from "@/shared/lib/config/env";
import ApiError from "@/shared/utils/ApiError";

export const BASE_URL = `${STORAGE_BASE_URL}/news/`;

export const fetchAllNews = async () => {
  return await newsApi.fetchAll();
};

export const createNews = async (form) => {
  try {
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    const newNews = await newsApi.create(formData);
    return newNews;
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Gagal membuat berita";
    const errors = err.response?.data?.errors || null;
    throw new ApiError(message, code, errors);
  }
};

export const updateNews = async (id, form) => {
  try {
    const formData = new FormData();

    Object.entries(form).forEach(([key, val]) => {
      if (key === "image" && !(val instanceof File)) return;
      if (val !== null && val !== undefined) formData.append(key, val);
    });

    formData.append("_method", "PUT");
    await newsApi.update(id, formData);
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Gagal memperbarui berita";
    const errors = err.response?.data?.errors || null;
    throw new ApiError(message, code, errors);
  }
}

export const deleteNews = async (id) => {
  try {
    await newsApi.remove(id);
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Gagal menghapus berita";
    throw new ApiError(message, code);
  }
};

export const fetchNewsDetail = async (id) => {
  return await newsApi.fetchById(id);
}