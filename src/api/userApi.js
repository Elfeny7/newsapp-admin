import api from "./api";

export const fetchAll = async () => api.get("/users").then(res => res.data.data);

export const create = async ({ name, email, password, role }) => {
  const res = await api.post("/users", { name, email, password, role });
  return res.data.data;
};

export const update = async (id, payload) => {
  await api.patch(`/users/${id}`, payload);
};

export const remove = async (id) => {
  await api.delete(`/users/${id}`);
};