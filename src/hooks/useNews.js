import { useState, useEffect } from "react";
import { fetchAllNews, newsDelete } from "../services/newsService";

export const useNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadNews = async () => {
            try {
                const data = await fetchAllNews();
                setNews(data);
            } catch (err) {
                setError(err.message || "Gagal mengambil data berita");
            } finally {
                setLoading(false);
            }
        };

        loadNews();
    }, []);

    const deleteNews = async (id) => {
        await newsDelete(id);
        setNews((prev) => prev.filter((n) => n.id !== id));
    };

    const clearError = () => setError(null);

    return { news, loading, error, deleteNews, clearError };
};