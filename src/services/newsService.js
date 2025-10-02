import { newsIndexApi, newsCreateApi, newsDeleteApi, newsUpdateApi } from "../api/news";

export const fetchAllNews = async() => {
    return await newsIndexApi();
};

export const newsCreate = async (payload) => {
  if (!payload.title || !payload.slug) {
    throw new Error("Judul dan Slug wajib diisi");
  }

  try {
    const newNews = await newsCreateApi(payload);
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

export const newsUpdate = async (id, payload) => {
  if (!payload.slug) {
    throw new Error("Slug wajib diisi");
  }

  try {
    await newsUpdateApi(id, payload);
  } catch (err) {
    throw new Error(err.response?.data?.message || "Gagal mengupdate berita");
  }
}