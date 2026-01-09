import * as categoryApi from "@/api/categoryApi";
import ApiError from "@/shared/utils/ApiError";

export const fetchAllCategories = async () => {
  try {
    return await categoryApi.fetchAll();
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Failed to fetch categories";
    throw new ApiError(message, code);
  }
};

export const createCategory = async (payload) => {
  try {
    const newCategory = await categoryApi.create(payload);
    return newCategory;
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Failed to create category";
    const errors = err.response?.data?.errors || null;
    throw new ApiError(message, code, errors);
  }
};

export const updateCategory = async (id, payload) => {
  try {
    await categoryApi.update(id, payload);
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Failed to update category";
    const errors = err.response?.data?.errors || null;
    throw new ApiError(message, code, errors);
  }
}

export const deleteCategory = async (id) => {
  try {
    await categoryApi.remove(id);
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Failed to delete category";
    throw new ApiError(message, code);
  }
};

