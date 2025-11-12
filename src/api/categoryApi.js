import api from "./axios";

export const fetchCategories = async () => api.get("/categories").then(res => res.data.data);

export const createCategory = async ({ name, slug, description, parent_id, status }) => {
  const res = await api.post("/categories", {  name, slug, description, parent_id, status });
  return res.data.data;
};

export const updateCategory = async (id, payload) => {
  await api.put(`/categories/${id}`, payload);
};

export const deleteCategory = async (id) => {
  await api.delete(`/categories/${id}`);
};