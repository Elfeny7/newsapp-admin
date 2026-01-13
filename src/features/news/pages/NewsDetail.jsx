import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Edit3 } from "lucide-react";
import { useNews } from "@/features/news/hooks/useNews";
import { useCategories } from "@/features/category/hooks/useCategories";
import NewsForm from "@/features/news/components/NewsForm";
import ModalError from "@/shared/components/ui/ModalError";

export default function NewsDetail({ mode }) {
    const { id } = useParams();
    const navigate = useNavigate();
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
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full border-4 border-blue-100"></div>
                    <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
                </div>
                <p className="text-gray-500 text-sm font-medium">Loading...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
            <div className="max-w-4xl mx-auto px-6 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="group flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors mb-6"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Kembali</span>
                    </button>

                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${isEditing ? 'bg-amber-100' : 'bg-blue-100'}`}>
                            {isEditing ? (
                                <Edit3 size={24} className="text-amber-600" />
                            ) : (
                                <FileText size={24} className="text-blue-600" />
                            )}
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {isEditing ? "Edit Berita" : "Buat Berita Baru"}
                            </h1>
                            <p className="text-gray-500 mt-1">
                                {isEditing
                                    ? "Perbarui informasi berita yang sudah ada"
                                    : "Isi formulir di bawah untuk membuat berita baru"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8">
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
                    </div>
                </div>

                {/* Footer Tips */}
                <div className="mt-6 flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                    <div className="p-1.5 bg-blue-100 rounded-lg shrink-0">
                        <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="text-sm text-blue-800">
                        <p className="font-medium">Tips</p>
                        <p className="text-blue-600 mt-0.5">Pastikan judul berita menarik dan deskripsi ringkasan sudah menjelaskan inti berita dengan jelas.</p>
                    </div>
                </div>
            </div>

            {error.length > 0 && (
                <ModalError
                    message={error.join("\n")}
                    onClose={clearError}
                />
            )}
        </div>
    )
}