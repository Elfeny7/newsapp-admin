import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../services/newsService";
import ModalError from "../components/ModalError";
import ModalConfirm from "../components/ModalConfirm";
import toast from "react-hot-toast";
import { SquarePen, Trash2 } from "lucide-react";
import Button from "../components/Button";
import Search from "../components/Search";
import Pagination from "../components/Pagiantion";
import { useNews } from "../hooks/useNews";
import { useCategories } from "../hooks/useCategories";

export default function News() {
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();

    const { news, loading: loadingNews, error: errorNews, deleteNews, clearError: clearNewsError } = useNews();
    const { categories, loading: loadingCategories, error: errorCategories, clearError: clearCategoryError } = useCategories();

    const loading = loadingNews || loadingCategories;
    const error = errorNews || errorCategories;
    const clearError = () => {
        if (errorNews) clearNewsError();
        if (errorCategories) clearCategoryError();
    };

    const handleDetail = (news) => {
        navigate(`/news/${news.id}`);
    };

    const handleDelete = async (id) => {
        await deleteNews(id);
        toast.success("Delete News Success");
    };

    const handleAddUser = () => {
        navigate("/news/create");
    }

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

    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-3xl font-bold">News Management</h1>
                <div className="flex items-center gap-2">
                    <Button onClick={() => handleAddUser()} >Add News</Button>
                    <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>

            <table className="table-fixed w-full text-sm text-left">
                <thead className="bg-blue-200 text-gray-700 border border-blue-300 uppercase text-xs">
                    <tr>
                        <th className="w-[50px] p-2 py-3 text-center cursor-pointer hover:bg-blue-300" onClick={() => {
                            setSortField("id");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}>ID {sortField === "id" && (sortOrder === "asc" ? "↑" : "↓")}</th>
                        <th className="w-[15%] p-2 text-center">Image</th>
                        <th className="w-[17%] p-2 cursor-pointer hover:bg-blue-300" onClick={() => {
                            setSortField("title");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}>Title {sortField === "title" && (sortOrder === "asc" ? "↑" : "↓")} </th>
                        <th className="w-[17%] p-2 cursor-pointer hover:bg-blue-300" onClick={() => {
                            setSortField("slug");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}>Slug {sortField === "slug" && (sortOrder === "asc" ? "↑" : "↓")}</th>
                        <th className="w-[20%] p-2 cursor-pointer hover:bg-blue-300" onClick={() => {
                            setSortField("excerpt");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}>Excerpt {sortField === "excerpt" && (sortOrder === "asc" ? "↑" : "↓")}</th>
                        <th className="w-[10%] p-2 cursor-pointer hover:bg-blue-300" onClick={() => {
                            setSortField("category_id");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}>Category {sortField === "category_id" && (sortOrder === "asc" ? "↑" : "↓")}</th>
                        <th className="w-[5%] p-2 cursor-pointer hover:bg-blue-300" onClick={() => {
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
                                        onClick={() => handleDetail(n)}
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
                </tbody>
            </table>
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}
            {error && (
                <ModalError
                    message={error}
                    onClose={clearError}
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