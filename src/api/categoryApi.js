import api from "../shared/lib/api/axios";

export const fetchAll = async () => api.get("/categories").then(res => res.data.data);

export const create = async ({ name, slug, description, parent_id, status }) => {
  const res = await api.post("/categories", { name, slug, description, parent_id, status });
  return res.data.data;
};

export const update = async (id, payload) => {
  await api.put(`/categories/${id}`, payload);
};

export const remove = async (id) => {
  await api.delete(`/categories/${id}`);
};