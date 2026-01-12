import { STORAGE_BASE_URL } from "@/shared/lib/config/env";
import ApiError from "@/shared/utils/ApiError";
import api from "@/shared/lib/api/axios";

export const BASE_URL = `${STORAGE_BASE_URL}/news/`;

export const fetchAllNews = async () => {
  return await api.get("/news").then(res => res.data.data);
};

export const createNews = async (form) => {
  try {
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    return await api.post("/news", formData).then(res => res.data.data);
  } catch (err) {
    throw ApiError.fromAxios(err);
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
    await api.post(`/news/${id}?_method=PUT`, formData);
  } catch (err) {
    throw ApiError.fromAxios(err);
  }
}

export const deleteNews = async (id) => {
  try {
    await api.delete(`/news/${id}`);
  } catch (err) {
    throw ApiError.fromAxios(err);
  }
};

export const fetchNewsDetail = async (id) => {
  return await api.get(`/news/${id}`).then(res => res.data.data);
}