import { categoryIndexApi, categoryCreateApi, categoryDeleteApi, categoryUpdateApi } from "../api/category";

export const fetchAllCategories = async() => {
    return await categoryIndexApi();
};

export const categoryCreate = async (payload) => {
  if (!payload.name || !payload.slug) {
    throw new Error("Nama dan Slug wajib diisi");
  }

  try {
    const newCategory = await categoryCreateApi(payload);
    return newCategory;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Gagal membuat kategori");
  }
};

export const categoryDelete = async (id) => {
  try {
    await categoryDeleteApi(id);
  } catch (err) {
    throw new Error(err.response?.data?.message || "Gagal menghapus kategori");
  }
};

export const categoryUpdate = async (id, payload) => {
  if (!payload.slug) {
    throw new Error("Slug wajib diisi");
  }

  try {
    await categoryUpdateApi(id, payload);
  } catch (err) {
    throw new Error(err.response?.data?.message || "Gagal mengupdate kategori");
  }
}