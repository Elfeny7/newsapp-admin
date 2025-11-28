import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import * as categoryService from "../services/categoryService";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [valError, setValError] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await categoryService.fetchAllCategories();
                setCategories(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setInitialLoading(false);
            }
        };

        loadCategories();
    }, []);

    const createCategory = async (form) => {
        try {
            setLoading(true);
            const newCategory = await categoryService.createCategory(form);
            setCategories((prev) => [...prev, newCategory]);
            toast.success("Create Category Success");
        } catch (err) {
            if (err.code == 422)
                setValError(err.errors);
            else
                setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateCategory = async (form) => {
        try {
            setLoading(true);
            await categoryService.updateCategory(form.id, form);
            const updatedList = await categoryService.fetchAllCategories();
            setCategories(updatedList);
            toast.success("Update Category Success");
        } catch (err) {
            if (err.code == 422)
                setValError(err.errors);
            else
                setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id) => {
        const prev = categories;
        try {
            setLoading(true);
            await categoryService.deleteCategory(id);
            setCategories((prev) => prev.filter((c) => c.id !== id));
            toast.success("Delete Category Success");
        } catch (err) {
            setCategories(prev);
            setError(err.message);
        }finally {
            setLoading(false);
        }
    };

    const clearError = () => { setValError(null); setError(null); };

    return {
        categories,
        loading,
        initialLoading,
        valError,
        error,
        clearError,
        deleteCategory,
        createCategory,
        updateCategory
    };
};