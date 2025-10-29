import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalError from "../components/ModalError";
import ModalConfirm from "../components/ModalConfirm";
import toast from "react-hot-toast";
import Button from "../components/Button";
import Search from "../components/Search";
import Pagination from "../components/Pagiantion";
import { useNews } from "../hooks/useNews";
import { useCategories } from "../hooks/useCategories";
import { useFilteredSortedNews } from "../hooks/useFilteredSortedNews";
import NewsTable from "../components/NewsTable";

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

    const { paginatedNews, totalPages } = useFilteredSortedNews({
        news,
        categories,
        search,
        sortField,
        sortOrder,
        currentPage,
        itemsPerPage,
    });

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
            <NewsTable
                data={paginatedNews}
                categories={categories}
                sortField={sortField}
                sortOrder={sortOrder}
                setSortField={setSortField}
                setSortOrder={setSortOrder}
                onEdit={handleDetail}
                onDelete={(id) => {
                    setSelectedId(id);
                    setConfirmOpen(true);
                }}
                loading={loading}
            />
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