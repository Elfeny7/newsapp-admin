import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchNewsDetail } from "../services/newsService";
import { fetchAllCategories } from "../services/categoryService";
import { fetchAllNews, newsCreate, newsUpdate, BASE_URL } from "../services/newsService";
import toast from "react-hot-toast";
import { ChevronDown } from "lucide-react";
import ModalError from "../components/ModalError";
import Editor from "../components/Editor";

export default function NewsDetail({ mode }) {
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState(null);
    const [globalError, setGlobalError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        image: null,
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category_id: "",
        status: "published",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            try {
                setInitialLoading(true);
                if (mode === "create") {
                    setIsEditing(false);
                    const categories = await fetchAllCategories();
                    setCategories(categories);
                    return;
                }
                setIsEditing(true);
                const [newsData, categoriesData] = await Promise.all([
                    fetchNewsDetail(id),
                    fetchAllCategories(),
                ]);
                if (newsData?.image) {
                    await new Promise((resolve) => {
                        const img = new Image();
                        img.src = BASE_URL + newsData.image;
                        img.onload = resolve;
                        img.onerror = resolve;
                    });
                }
                setForm(newsData);
                setCategories(categoriesData);
            } catch (err) {
                setError(err.message || "Gagal memuat data");
            } finally {
                setInitialLoading(false);
            }
        };

        loadData();
    }, [mode, id]);

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setForm({ ...form, image: e.target.files[0] });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);

        try {
            setLoading(true);

            if (isEditing) {
                const payload = { ...form };
                await newsUpdate(form.id, payload);
                await fetchAllNews();
                setIsEditing(false);
                toast.success("Update News Success");
            } else {
                await newsCreate(form);
                toast.success("Create News Success");
            }
            navigate("/news");
        } catch (err) {
            if (err.code == 422)
                setError(err.errors);
            else
                setGlobalError(err.message || "Gagal menyimpan berita");
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-3xl font-bold">News Detail</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-2">
                {isEditing && (<img className="block" src={BASE_URL + form.image} alt={form.title} width="250" />)}
                <input
                    type="file"
                    name="image"
                    placeholder="Image"
                    onChange={handleChange}
                    disabled={loading}
                    className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                />
                {error?.image && (
                    <p className="text-red-500 text-sm">{error.image[0]}</p>
                )}

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    disabled={loading}
                    className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                />
                {error?.title && (
                    <p className="text-red-500 text-sm">{error.title[0]}</p>
                )}

                <input
                    type="text"
                    name="slug"
                    placeholder="Slug"
                    value={form.slug}
                    onChange={handleChange}
                    disabled={loading}
                    className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                />
                {error?.slug && (
                    <p className="text-red-500 text-sm">{error.slug[0]}</p>
                )}

                <input
                    type="text"
                    name="excerpt"
                    placeholder="Excerpt"
                    value={form.excerpt}
                    onChange={handleChange}
                    disabled={loading}
                    className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                />
                {error?.excerpt && (
                    <p className="text-red-500 text-sm">{error.excerpt[0]}</p>
                )}
                <Editor
                    value={form.content}
                    onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
                    disabled={loading}
                />
                {error?.content && (
                    <p className="text-red-500 text-sm">{error.content[0]}</p>
                )}

                <div className="relative">
                    <select name="category_id" value={form.category_id} onChange={handleChange} disabled={loading} className="appearance-none p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed">
                        <option value="" disabled hidden>Pilih Kategori</option>
                        {categories.map((c) => {
                            if (c.status === "inactive") return null;
                            return (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            )
                        })}
                    </select>
                    <ChevronDown
                        size={18}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                    />
                </div>
                {error?.category_id && (
                    <p className="text-red-500 text-sm">{error.category_id[0]}</p>
                )}
                <div className="relative">
                    <select name="status" value={form.status} onChange={handleChange} disabled={loading} className="appearance-none p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed">
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                    <ChevronDown
                        size={18}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                    />
                </div>

                <div className="flex gap-2 pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`bg-blue-500 text-white px-4 py-2 rounded-lg flex-1 ${loading
                            ? "opacity-70 cursor-not-allowed"
                            : "hover:bg-blue-600 cursor-pointer"
                            }`}
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mx-auto"></div>
                        ) : (
                            <span>{isEditing ? "Update News" : "Add News"}</span>
                        )}
                    </button>
                </div>
            </form>
            {globalError && (
                <ModalError
                    message={globalError}
                    onClose={() => setGlobalError(null)}
                />
            )}
        </div>
    )
}