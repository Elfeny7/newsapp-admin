import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNews } from "@/features/news/hooks/useNews";
import { useCategories } from "@/features/category/hooks/useCategories";
import NewsForm from "@/features/news/components/NewsForm";
import ModalError from "@/shared/components/ui/ModalError";

export default function NewsDetail({ mode }) {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const defaultForm = {
        image: null,
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category_id: "",
        status: "published",
    };
    const [form, setForm] = useState(defaultForm);

    const { newsDetail, initialLoading: initialLoadingNews, loading, error: errorNews, errorVal, clearError: clearErrorNews, createNews, updateNews, BASE_URL } = useNews({ id, mode });

    const { categories, initialLoading: initialLoadingCategories, globalError: errorCategories, clearError: clearErrorCategory } = useCategories();

    const initialLoading = initialLoadingNews || initialLoadingCategories;
    const error = [errorNews, errorCategories].filter(Boolean);
    const clearError = () => {
        if (errorNews) clearErrorNews();
        if (errorCategories) clearErrorCategory();
    };

    useEffect(() => {
        if (mode !== "edit" || !newsDetail) return;

        setIsEditing(true);
        setForm(newsDetail);
    }, [mode, newsDetail]);

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setForm({ ...form, image: e.target.files[0] });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEditing) {
            await updateNews(form);
            setIsEditing(false);
        } else {
            await createNews(form);
        }
    };

    if (initialLoading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="p-6">
            <div className="text-lg font-semibold mb-6">News Detail</div>
            <NewsForm
                isEditing={isEditing}
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                loading={loading}
                errorVal={errorVal}
                categories={categories}
                BASE_URL={BASE_URL}
                editorOnChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
            />

            {error.length > 0 && (
                <ModalError
                    message={error.join("\n")}
                    onClose={clearError}
                />
            )}
        </div>
    )
}