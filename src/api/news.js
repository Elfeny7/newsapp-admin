import api from "./axios";

export const newsIndexApi = async () => api.get("/news").then(res => res.data.data);

export const newsCreateApi = async (formData) => {
    const res = await api.post("/news", formData);
    return res.data.data;
};

export const newsDeleteApi = async (id) => {
    await api.delete(`/news/${id}`);
};

export const newsUpdateApi = async (id, formData) => {
    return api.post(`/news/${id}?_method=PUT`, formData);
};

export const newsShowApi = async (id) => api.get(`/news/${id}`).then(res => res.data.data);