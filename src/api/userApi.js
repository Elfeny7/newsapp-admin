import api from "./axios";

export const fetchUsers = async () => api.get("/users").then(res => res.data.data);

export const createUser = async ({ name, email, password, role }) => {
  const res = await api.post("/users", { name, email, password, role });
  return res.data.data;
};

export const updateUser = async (id, payload) => {
  await api.patch(`/users/${id}`, payload);
};

export const deleteUser = async (id) => {
  await api.delete(`/users/${id}`);
};