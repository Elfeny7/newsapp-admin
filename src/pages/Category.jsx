import { useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { useFilteredSortedCategory } from "../hooks/useFilteredSortedCategory";
import ModalError from "../components/ModalError";
import ModalConfirm from "../components/ModalConfirm";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import Button from "../components/Button";
import CategoryTable from "../components/CategoryTable";
import CategoryFormModal from "../components/CategoryFormModal";

export default function Category() {
    const [isEditing, setIsEditing] = useState(false);
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const defaultForm = {
        name: "",
        slug: "",
        description: "",
        parent_id: "",
        status: "active"
    };
    const [form, setForm] = useState(defaultForm);

    const {
        categories,
        loading,
        initialLoading,
        valError,
        error,
        clearError,
        deleteCategory,
        createCategory,
        updateCategory
    } = useCategories();

    const { paginatedCategories, totalPages } = useFilteredSortedCategory({
        categories,
        search,
        sortField,
        sortOrder,
        currentPage,
        itemsPerPage,
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();
        if (isEditing) {
            await updateCategory(form);
        } else {
            await createCategory(form);
        }
        setForm(defaultForm);
    };

    const handleEdit = (category) => {
        clearError();
        setIsModalOpen(true);
        setIsEditing(true);
        setForm({ ...category });
    };

    const handleDelete = async (id) => {
        clearError();
        await deleteCategory(id);
        setConfirmOpen(false);
    };

    if (initialLoading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="p-6">
            {isModalOpen && (
                <CategoryFormModal
                    onClose={() => {
                        setIsModalOpen(false);
                        setIsEditing(false);
                        setForm(defaultForm);
                    }}
                    form={form}
                    isEditing={isEditing}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    loading={loading}
                    error={valError}
                    categories={categories}
                />
            )}
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-3xl font-bold">Category Management</h1>
                <div className="flex items-center gap-2">
                    <Button onClick={() => setIsModalOpen(true)} >Add Category</Button>
                    <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <CategoryTable
                paginatedCategories={paginatedCategories}
                categories={categories}
                sortField={sortField}
                sortOrder={sortOrder}
                setSortField={setSortField}
                setSortOrder={setSortOrder}
                onEdit={handleEdit}
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
                    message="Apakah Anda yakin ingin menghapus kategori ini?"
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