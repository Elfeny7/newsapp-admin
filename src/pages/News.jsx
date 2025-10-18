import { useState, useEffect } from "react";
import { fetchAllNews, newsCreate, newsDelete, newsUpdate, BASE_URL } from "../services/newsService";
import { fetchAllCategories } from "../services/categoryService";
import ModalError from "../components/ModalError";
import ModalConfirm from "../components/ModalConfirm";
import toast from "react-hot-toast";
import React from "react";
import { SquarePen, Trash2, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export default function News() {
    const [news, setNews] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState(null);
    const [globalError, setGlobalError] = useState(null);
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [form, setForm] = useState({
        image: null,
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
                setInitialLoading(false);
            }
        };

        const loadCategories = async () => {
            try {
                const data = await fetchAllCategories();
                setCategories(data);
            } catch (err) {
                setError(err.message || "Gagal mengambil data kategori");
            } finally {
                setInitialLoading(false);
            }
        };

        loadNews();
        loadCategories();
    }, []);

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
                const freshNews = await fetchAllNews();
                setNews(freshNews);
                setIsEditing(false);
                toast.success("Update News Success");
            } else {
                const newNews = await newsCreate(form);
                setNews((prev) => [...prev, newNews]);
                toast.success("Create News Success");
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
            if (err.code == 422)
                setError(err.errors);
            else
                setGlobalError(err.message || "Gagal menyimpan berita");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (news) => {
        setError(null);
        setIsModalOpen(true);
        setIsEditing(true);
        setForm({ ...news });
    };

    const handleDelete = async (id) => {
        setError(null);
        try {
            setLoading(true);
            await newsDelete(id);
            setNews(news.filter((prev) => prev.id !== id));
            toast.success("Delete News Success");
        } catch (err) {
            setGlobalError(err.message || "Gagal menghapus berita");
        } finally {
            setLoading(false);
        }
    };

    const filteredNews = news.filter((news) => {
        const category = categories.find((c) => c.id === news.category_id);
        const categoryName = category ? category.name.toLowerCase() : "";

        const searchTerm = search.toLowerCase();

        return (
            news.id.toString().includes(searchTerm) ||
            news.title.toLowerCase().includes(searchTerm) ||
            news.slug.toLowerCase().includes(searchTerm) ||
            news.excerpt.toLowerCase().includes(searchTerm) ||
            categoryName.includes(searchTerm) ||
            news.content.toLowerCase().includes(searchTerm) ||
            news.status.toLowerCase().includes(searchTerm)
        );
    });

    const categoryMap = Object.fromEntries(categories.map(c => [c.id, c.name]));

    const sortedNews = [...filteredNews].sort((a, b) => {
        if (sortField === "category_id") {
            const categoryNameA = categoryMap[a.category_id] || "";
            const categoryNameB = categoryMap[b.category_id] || "";
            return sortOrder === "asc"
                ? categoryNameA.localeCompare(categoryNameB)
                : categoryNameB.localeCompare(categoryNameA);
        }

        const fieldA = a[sortField];
        const fieldB = b[sortField];

        if (typeof fieldA === "number" && typeof fieldB === "number") {
            return sortOrder === "asc" ? fieldA - fieldB : fieldB - fieldA;
        }

        const valueA = String(fieldA).toLowerCase();
        const valueB = String(fieldB).toLowerCase();

        if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
        if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
        return 0;
    });

    const totalPages = Math.ceil(sortedNews.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedNews = sortedNews.slice(startIndex, startIndex + itemsPerPage);

    if (initialLoading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="p-6">
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
                        <h2 className="text-xl font-semibold mb-4">
                            {isEditing ? "Edit News" : "Add News"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-2">
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
                            {error?.name && (
                                <p className="text-red-500 text-sm">{error.name[0]}</p>
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

                            <textarea
                                name="content"
                                placeholder="Content"
                                value={form.content}
                                onChange={handleChange}
                                disabled={loading}
                                className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                            />
                            {error?.content && (
                                <p className="text-red-500 text-sm">{error.content[0]}</p>
                            )}

                            <div className="relative">
                                <select name="category_id" value={form.parent_id} onChange={handleChange} disabled={loading} className="appearance-none p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed">
                                    <option value="">Pilih Kategori</option>
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
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setIsEditing(false);
                                        setForm({
                                            image: null,
                                            title: "",
                                            slug: "",
                                            excerpt: "",
                                            content: "",
                                            category_id: "",
                                            status: "published",
                                        });
                                    }}
                                    disabled={loading}
                                    className={`bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex-1 ${loading
                                        ? "opacity-70 cursor-not-allowed"
                                        : "hover:bg-gray-300 cursor-pointer"
                                        }`}
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between mb-5">
                <h1 className="text-3xl font-bold">News Management</h1>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-pointer"
                    >
                        Add News
                    </button>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="rounded-lg p-2 w-[200px] bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-300 focus:outline-none focus:border-gray-300"
                    />
                </div>
            </div>

            <table className="w-full border border-gray-300">
                <thead className="bg-blue-200 text-gray-700 border border-blue-300 uppercase text-xs">
                    <tr>
                        <th className="w-[50px] p-2 py-3 text-center cursor-pointer hover:bg-blue-300" onClick={() => {
                            setSortField("id");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}>ID {sortField === "id" && (sortOrder === "asc" ? "↑" : "↓")}</th>
                        <th className="w-[15%] p-2">Image</th>
                        <th className="w-[17%] p-2 text-left cursor-pointer hover:bg-blue-300" onClick={() => {
                            setSortField("title");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}>Title {sortField === "title" && (sortOrder === "asc" ? "↑" : "↓")} </th>
                        <th className="w-[17%] text-left p-2 cursor-pointer hover:bg-blue-300" onClick={() => {
                            setSortField("slug");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}>Slug {sortField === "slug" && (sortOrder === "asc" ? "↑" : "↓")}</th>
                        <th className="w-[20%] text-left p-2 cursor-pointer hover:bg-blue-300" onClick={() => {
                            setSortField("excerpt");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}>Excerpt {sortField === "excerpt" && (sortOrder === "asc" ? "↑" : "↓")}</th>
                        <th className="w-[10%] text-left p-2 cursor-pointer hover:bg-blue-300" onClick={() => {
                            setSortField("category_id");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}>Category {sortField === "category_id" && (sortOrder === "asc" ? "↑" : "↓")}</th>
                        <th className="w-[5%] text-left p-2 cursor-pointer hover:bg-blue-300" onClick={() => {
                            setSortField("status");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}>Status {sortField === "status" && (sortOrder === "asc" ? "↑" : "↓")}</th>
                        <th className="w-[10%] p-2 text-center">Action</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-blue-100">
                    {paginatedNews.map((n) => {
                        const category = categories.find((c) => c.id === n.category_id);
                        return (
                            <tr key={n.id} className="hover:bg-blue-100 transition">
                                <td className="p-2 text-center">{n.id}</td>
                                <td className="p-2"><img className="mx-auto block" src={BASE_URL + n.image} alt={n.title} width="250" /></td>
                                <td className="p-2">{n.title}</td>
                                <td className="p-2">{n.slug}</td>
                                <td className="p-2">{n.excerpt}</td>
                                <td className="p-2">
                                    {category ? category.name : "-"}
                                </td>
                                <td className="p-2">{n.status}</td>
                                <td className="p-2 space-x-4 text-center">
                                    <button
                                        onClick={() => handleEdit(n)}
                                        disabled={loading}
                                        className={`${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                                    >
                                        <SquarePen size={20} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSelectedId(n.id);
                                            setConfirmOpen(true);
                                        }}
                                        disabled={loading}
                                        className={`${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    {news.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center p-6 text-gray-500">
                                <div className="flex flex-col items-center">
                                    <span>🫥</span>
                                    <span className="mt-2">No news found</span>
                                </div>
                            </td>
                        </tr>
                    )}
                    {news.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center p-4 text-gray-500">
                                No news found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-4">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-1.5 rounded bg-gray-200 cursor-pointer hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(page =>
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 2 && page <= currentPage + 2)
                        )
                        .map((page, index, filteredPages) => {
                            const prevPage = filteredPages[index - 1];
                            const showDots = prevPage && page - prevPage > 1;
                            return (
                                <React.Fragment key={page}>
                                    {showDots && <span>…</span>}
                                    <button
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-3 py-1 rounded transition-colors ${currentPage === page ? "bg-blue-500 text-white cursor-pointer" : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                </React.Fragment>
                            );
                        })}
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-1.5 rounded bg-gray-200 cursor-pointer hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            )}
            {globalError && (
                <ModalError
                    message={globalError}
                    onClose={() => setGlobalError(null)}
                />
            )}
            {confirmOpen && (
                <ModalConfirm
                    message="Apakah Anda yakin ingin menghapus berita ini?"
                    onConfirm={async () => {
                        await handleDelete(selectedId);
                        setConfirmOpen(false);
                    }}
                    onCancel={() => setConfirmOpen(false)}
                />
            )}
        </div >
    );
}