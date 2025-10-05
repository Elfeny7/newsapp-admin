import { newsIndexApi, newsCreateApi, newsDeleteApi, newsUpdateApi } from "../api/news";
import { STORAGE_BASE_URL } from "../config/env";

export const BASE_URL = `${STORAGE_BASE_URL}/news/`;

export const fetchAllNews = async () => {
  return await newsIndexApi();
};

export const newsCreate = async (form) => {
  if (!form.title || !form.slug) {
    throw new Error("Judul dan Slug wajib diisi");
  }

  try {
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    const newNews = await newsCreateApi(formData);
    return newNews;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Gagal membuat berita");
  }
};

export const newsDelete = async (id) => {
  try {
    await newsDeleteApi(id);
  } catch (err) {
    throw new Error(err.response?.data?.message || "Gagal menghapus berita");
  }
};

export const newsUpdate = async (id, form) => {
  if (!form.slug) {
    throw new Error("Slug wajib diisi");
  }

  try {
    const formData = new FormData();

    Object.entries(form).forEach(([key, val]) => {
      if (key === "image" && !(val instanceof File)) return;
      if (val !== null && val !== undefined) formData.append(key, val);
    });

    formData.append("_method", "PUT");
    await newsUpdateApi(id, formData);
  } catch (err) {
    throw new Error(err.response?.data?.message || "Gagal mengupdate berita");
  }
}