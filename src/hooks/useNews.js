import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../services/newsService";
import { useNavigate } from "react-router-dom";
import { fetchAllNews, newsDelete, newsCreate, newsUpdate, fetchNewsDetail } from "../services/newsService";

export const useNews = ({ id, mode } = {}) => {
    const [news, setNews] = useState([]);
    const [newsDetail, setNewsDetail] = useState();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorVal, setErrorVal] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id && mode === "edit") {
            const loadNewsDetail = async () => {
                try {
                    const data = await fetchNewsDetail(id);
                    if (data?.image) {
                        await new Promise((resolve) => {
                            const img = new Image();
                            img.src = BASE_URL + data.image;
                            img.onload = resolve;
                            img.onerror = resolve;
                        });
                    }
                    setNewsDetail(data);
                } catch (err) {
                    setError(err.message || "Gagal mengambil data berita");
                } finally {
                    setInitialLoading(false);
                };
            };
            loadNewsDetail();

        } else if (mode === "create") {
            setInitialLoading(false);

        } else if (!id && !mode) {
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
        }

    }, [id, mode]);

    const deleteNews = async (id) => {
        try {
            setLoading(true);
            await newsDelete(id);
            setNews((prev) => prev.filter((n) => n.id !== id));
            toast.success("Delete News Success");
        } catch (err) {
            setError(err.message || "Gagal menghapus berita");
        } finally {
            setLoading(false);
        }
    };

    const createNews = async (form) => {
        try {
            setLoading(true);
            await newsCreate(form);
            toast.success("Create News Success");
            navigate("/news");
        } catch (err) {
            if (err.code == 422)
                setErrorVal(err.errors);
            else
                setError(err.message || "Gagal membuat berita");
        } finally {
            setLoading(false);
        };
    };

    const updateNews = async (form) => {
        try {
            setLoading(true);
            await newsUpdate(form.id, form);
            toast.success("Update News Success");
            navigate("/news");
        } catch (err) {
            if (err.code == 422)
                setErrorVal(err.errors);
            else
                setError(err.message || "Gagal memperbarui berita");
        } finally {
            setLoading(false);
        };
    };

    const clearError = () => setError(null);

    return {
        news,
        newsDetail,
        loading,
        initialLoading,
        error,
        errorVal,
        deleteNews,
        clearError,
        createNews,
        updateNews,
        BASE_URL
    };
};