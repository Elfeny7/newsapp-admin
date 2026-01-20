import { useState } from "react";
import { useCategories } from "@/features/category/hooks/useCategories";
import { useFilteredSortedCategory } from "@/shared/hooks/useFilteredSortedCategory";
import ModalError from "@/shared/components/ui/ModalError";
import ModalConfirm from "@/shared/components/ui/ModalConfirm";
import Pagination from "@/shared/components/ui/Pagination";
import Search from "@/shared/components/ui/Search";
import Button from "@/shared/components/ui/Button";
import CategoryTable from "@/features/category/components/CategoryTable";
import CategoryFormModal from "@/features/category/components/CategoryFormModal";
import { LayoutGrid } from "lucide-react";

export default function Category() {
    const [isEditing, setIsEditing] = useState(false);
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedParent, setSelectedParent] = useState(null);
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

    const handleDelete = async (category) => {
        clearError();
        await deleteCategory(category.id);
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
            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-blue-100">
                    <LayoutGrid size={24} className="text-blue-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Category Management</h1>
                    <p className="text-gray-500">Halaman untuk mengelola kategori dari suatu berita</p>
                </div>
            </div>
            <div className="flex items-center justify-end mb-2">
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
                onDelete={({ c, parent }) => {
                    setSelectedCategory(c);
                    setSelectedParent(parent);
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
                    children={
                        <div>
                            <p><strong>Nama:</strong> {selectedCategory.name}</p>
                            <p><strong>Parent:</strong> {selectedParent.name}</p>
                            <p><strong>Status:</strong> {selectedCategory.status}</p>
                        </div>
                    }
                    onConfirm={async () => {
                        await handleDelete(selectedCategory);
                    }}
                    onCancel={() => setConfirmOpen(false)}
                    loading={loading}
                />
            )}
        </div >
    );
}