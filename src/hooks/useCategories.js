import { useState, useEffect } from "react";
import { fetchAllCategories } from "../services/categoryService";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchAllCategories();
                setCategories(data);
            } catch (err) {
                setError(err.message || "Gagal mengambil kategori");
            } finally {
                setLoading(false);
            }
        };

        loadCategories();
    }, []);

    const clearError = () => setError(null);

    return { categories, loading, error, clearError };
};