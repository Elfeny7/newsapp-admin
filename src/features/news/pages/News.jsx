import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNews } from "@/features/news/hooks/useNews";
import { useCategories } from "@/features/category/hooks/useCategories";
import { useFilteredSortedNews } from "@/features/news/hooks/useFilteredSortedNews";
import ModalError from "@/shared/components/ui/ModalError";
import ModalConfirm from "@/shared/components/ui/ModalConfirm";
import Button from "@/shared/components/ui/Button";
import Search from "@/shared/components/ui/Search";
import Pagination from "@/shared/components/ui/Pagination";
import NewsTable from "@/features/news/components/NewsTable";

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
    const { categories, initialLoading: initialLoadingCategories, globalError: errorCategories, clearError: clearCategoryError } = useCategories();

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
            <div className="text-lg font-semibold mb-4">News Management</div>
            <div className="flex items-center justify-end mb-2">
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