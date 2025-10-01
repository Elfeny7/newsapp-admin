import api from "./axios";

export const userIndexApi = async () => api.get("/users").then(res => res.data.data);

export const userCreateApi = async ({ name, email, password, role }) => {
  const res = await api.post("/users", { name, email, password, role });
  return res.data.data;
};

export const userDeleteApi = async (id) => {
  await api.delete(`/users/${id}`);
};

export const userUpdateApi = async (id, payload) => {
  await api.patch(`/users/${id}`, payload);
};