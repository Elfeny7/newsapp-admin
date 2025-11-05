import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNews } from "../hooks/useNews";
import { useCategories } from "../hooks/useCategories";
import { useFilteredSortedNews } from "../hooks/useFilteredSortedNews";
import ModalError from "../components/ModalError";
import ModalConfirm from "../components/ModalConfirm";
import Button from "../components/Button";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
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

    const { news, loading: loadingNews, initialLoading: initialLoadingNews, error: errorNews, deleteNews, clearError: clearNewsError } = useNews();
    const { categories, initialLoading: initialLoadingCategories, error: errorCategories, clearError: clearCategoryError } = useCategories();

    const initialLoading = initialLoadingNews || initialLoadingCategories;
    const loading = loadingNews;
    const error = [errorNews, errorCategories].filter(Boolean);

    const clearError = () => {
        if (errorNews) clearNewsError();
        if (errorCategories) clearCategoryError();
    };

    const handleDetail = (news) => {
        navigate(`/news/${news.id}`);
    };

    const handleAddNews = () => {
        navigate("/news/create");
    }

    const handleDelete = async (id) => {
        await deleteNews(id);
        setConfirmOpen(false);
    };

    const { paginatedNews, totalPages } = useFilteredSortedNews({
        news,
        categories,
        search,
        sortField,
        sortOrder,
        currentPage,
        itemsPerPage,
    });

    if (initialLoading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-3xl font-bold">News Management</h1>
                <div className="flex items-center gap-2">
                    <Button onClick={handleAddNews} >Add News</Button>
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
            {error.length > 0 && (
                <ModalError
                    message={error.join("\n")}
                    onClose={clearError}
                />
            )}
            {confirmOpen && (
                <ModalConfirm
                    message="Apakah Anda yakin ingin menghapus berita ini?"
                    onConfirm={async () => {
                        await handleDelete(selectedId);
                    }}
                    onCancel={() => setConfirmOpen(false)}
                    loading={loading}
                />
            )}
        </div >
    );
}