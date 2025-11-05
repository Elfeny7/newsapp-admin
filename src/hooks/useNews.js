import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { fetchAllNews, newsDelete } from "../services/newsService";

export const useNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadNews = async () => {
            try {
                const data = await fetchAllNews();
                setNews(data);
            } catch (err) {
                setError(err.message || "Gagal mengambil data berita");
            } finally {
                setInitialLoading(false);
            }
        };

        loadNews();
    }, []);

    const deleteNews = async (id) => {
        try {
            setLoading(true);
            await newsDelete(id);
            setNews((prev) => prev.filter((n) => n.id !== id));
            toast.success("Delete News Success");
        } catch(err) {
            setError(err.message || "Gagal menghapus berita");
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => setError(null);

    return { news, loading, initialLoading, error, deleteNews, clearError };
};