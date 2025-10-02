import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllNews, newsCreate, newsDelete, newsUpdate } from "../services/newsService";
import { fetchAllCategories } from "../services/categoryService";

export default function News() {
    const [news, setNews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        image: "",
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category_id: "",
        status: "published",
    });

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
        
        const loadCategories = async () => {
            try {
                const data = await fetchAllCategories();
                setCategories(data);
            } catch (err) {
                setError(err.message || "Gagal mengambil data kategori");
            } finally {
                setLoading(false);
            }
        };
        
        loadNews();
        loadCategories();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            if (isEditing) {
                await newsUpdate(form.id, form);
                const freshNews = await fetchAllNews();
                setNews(freshNews);
                setIsEditing(false);
            } else {
                const newNews = await newsCreate(form);
                setNews((prev) => [...prev, newNews]);
            }

            setForm({
                image: "",
                title: "",
                slug: "",
                excerpt: "",
                content: "",
                category_id: "",
                status: "published",
            });
        } catch (err) {
            setError(err.message || "Gagal menyimpan data");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (news) => {
        setForm(news);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await newsDelete(id);
            setNews(news.filter((prev) => prev.id !== id));
        } catch (err) {
            setError(err.message || "Gagal menghapus berita");
        } finally {
            setLoading(false);
        }
    };


    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">News Management</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="mb-6 space-y-2">
                <input
                    type="image"
                    name="image"
                    placeholder="Image"
                    value={form.image}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />
                <input
                    type="text"
                    name="slug"
                    placeholder="Slug"
                    value={form.slug}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />
                <input
                    type="text"
                    name="excerpt"
                    placeholder="Excerpt"
                    value={form.excerpt}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />
                <input
                    type="text"
                    name="content"
                    placeholder="Content"
                    value={form.content}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />
                <select name="category" value={form.category} onChange={handleChange} className="border p-2 w-full rounded cursor-pointer" requiredz>
                    <option value="">-- Pilih Kategori --</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
                <select name="status" value={form.status} onChange={handleChange} className="border p-2 w-full rounded cursor-pointer">
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-2 rounded w-full cursor-pointer"
                >
                    {isEditing ? "Update News" : "Add News"}
                </button>
            </form>

            <table className="w-full border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Image</th>
                        <th className="border p-2">Title</th>
                        <th className="border p-2">Slug</th>
                        <th className="border p-2">Excerpt</th>
                        <th className="border p-2">Content</th>
                        <th className="border p-2">Category</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {news.map((n) => {
                        const category = categories.find((c) => c.id === n.category_id);
                        return (
                            <tr key={n.id}>
                                <td className="border p-2">{n.id}</td>
                                <td className="border p-2">{n.image}</td>
                                <td className="border p-2">{n.title}</td>
                                <td className="border p-2">{n.slug}</td>
                                <td className="border p-2">{n.excerpt}</td>
                                <td className="border p-2">{n.content}</td>
                                <td className="border p-2">{category ? category.name : "-"}</td>
                                <td className="border p-2">{n.status}</td>
                                <td className="border p-2 space-x-2">
                                    <button
                                        onClick={() => handleEdit(n)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(n.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    {news.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center p-4 text-gray-500">
                                No news found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Link to="/" className="text-blue-500 hover:underline">Back to Dashboard</Link>
        </div >
    );
}