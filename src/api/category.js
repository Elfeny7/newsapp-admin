import api from "./axios";

export const categoryIndexApi = async () => api.get("/categories").then(res => res.data.data);

export const categoryCreateApi = async ({ name, slug, description, parent_id, status }) => {
  const res = await api.post("/categories", {  name, slug, description, parent_id, status });
  return res.data.data;
};

export const categoryDeleteApi = async (id) => {
  await api.delete(`/categories/${id}`);
};

export const categoryUpdateApi = async (id, { name, slug, description, parent_id, status }) => {
  await api.put(`/categories/${id}`, { name, slug, description, parent_id, status });
};