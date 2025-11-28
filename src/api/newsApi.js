import api from "./api";

export const fetchAll = async () => api.get("/news").then(res => res.data.data);

export const create = async (formData) => {
    const res = await api.post("/news", formData);
    return res.data.data;
};

export const update = async (id, formData) => {
    await api.post(`/news/${id}?_method=PUT`, formData);
};

export const remove = async (id) => {
    await api.delete(`/news/${id}`);
};

export const fetchById = async (id) => api.get(`/news/${id}`).then(res => res.data.data);