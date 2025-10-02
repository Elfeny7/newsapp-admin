import api from "./axios";

export const newsIndexApi = async () => api.get("/news").then(res => res.data.data);

export const newsCreateApi = async ({ image, title, slug, excerpt, content, category_id, status }) => {
    const res = await api.post("/news", { image, title, slug, excerpt, content, category_id, status });
    return res.data.data;
};

export const newsDeleteApi = async (id) => {
    await api.delete(`/news/${id}`);
};

export const newsUpdateApi = async (id, { image, title, slug, excerpt, content, category_id, status }) => {
    await api.put(`/categories/${id}`, { image, title, slug, excerpt, content, category_id, status });
};