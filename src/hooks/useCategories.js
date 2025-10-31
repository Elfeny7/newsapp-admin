import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { fetchAllCategories, categoryDelete, categoryCreate, categoryUpdate } from "../services/categoryService";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState(null);
    const [globalError, setGlobalError] = useState(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchAllCategories();
                setCategories(data);
            } catch (err) {
                setError(err.message || "Gagal mengambil kategori");
            } finally {
                setInitialLoading(false);
            }
        };

        loadCategories();
    }, []);

    const createCategory = async (form) => {
        try {
            setLoading(true);
            const newCategory = await categoryCreate(form);
            setCategories((prev) => [...prev, newCategory]);
            toast.success("Create Category Success");
        } catch (err) {
            if (err.code == 422)
                setError(err.errors);
            else
                setGlobalError(err.message || "Gagal membuat kategori");
        } finally {
            setLoading(false);
        }
    };

    const updateCategory = async (form) => {
        try {
            setLoading(true);
            await categoryUpdate(form.id, form);
            const updatedList = await fetchAllCategories();
            setCategories(updatedList);
            toast.success("Update Category Success");
        } catch (err) {
            if (err.code == 422)
                setError(err.errors);
            else
                setGlobalError(err.message || "Gagal membuat kategori");
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id) => {
        const prev = categories;
        try {
            await categoryDelete(id);
            setCategories((prev) => prev.filter((c) => c.id !== id));
            toast.success("Delete Category Success");
        } catch (err) {
            setCategories(prev);
            setGlobalError(err.message || "Gagal menghapus kategori");
        }
    };

    const clearError = () => { setError(null); setGlobalError(null); };

    return { categories, loading, initialLoading, error, globalError, clearError, deleteCategory, createCategory, updateCategory };
};