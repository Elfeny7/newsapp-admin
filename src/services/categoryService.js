import * as categoryApi from "../api/categoryApi";
import ApiError from "../utils/ApiError";

export const getAll = async () => {
  try {
    return await categoryApi.fetchCategories();
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Failed to fetch categories";
    throw new ApiError(message, code);
  }
};

export const create = async (payload) => {
  try {
    const newCategory = await categoryApi.createCategory(payload);
    return newCategory;
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Failed to create category";
    const errors = err.response?.data?.errors || null;
    throw new ApiError(message, code, errors);
  }
};

export const update = async (id, payload) => {
  try {
    await categoryApi.updateCategory(id, payload);
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Failed to update category";
    const errors = err.response?.data?.errors || null;
    throw new ApiError(message, code, errors);
  }
}

export const remove = async (id) => {
  try {
    await categoryApi.deleteCategory(id);
  } catch (err) {
    const code = err.response?.status || null;
    const message = err.response?.data?.message || "Failed to delete category";
    throw new ApiError(message, code);
  }
};

