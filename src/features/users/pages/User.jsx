import { useState } from "react";
import { useFilteredSortedUser } from "@/features/users/hooks/useFilteredSortedUser";
import { useUsers } from "@/features/users/hooks/useUsers";
import ModalError from "@/shared/components/ui/ModalError";
import ModalConfirm from "@/shared/components/ui/ModalConfirm";
import Pagination from "@/shared/components/ui/Pagination";
import Search from "@/shared/components/ui/Search";
import Button from "@/shared/components/ui/Button";
import UserTable from "@/features/users/components/UserTable";
import UserFormModal from "@/features/users/components/UserFormModal";

export default function User() {
    const [isEditing, setIsEditing] = useState(false);
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const defaultForm = {
        name: "",
        email: "",
        password: "",
        role: "viewer",
    };
    const [form, setForm] = useState(defaultForm);

    const {
        users,
        loading,
        initialLoading,
        valError,
        error,
        createUser,
        updateUser,
        deleteUser,
        clearError
    } = useUsers();

    const { paginatedUsers, totalPages } = useFilteredSortedUser({
        users,
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
        if (isEditing) await updateUser(form);
        else await createUser(form);
        setForm(defaultForm);
    };

    const handleEdit = (user) => {
        clearError();
        setIsModalOpen(true);
        setIsEditing(true);
        setForm({
            ...user,
            password: "",
        });
    };

    const handleDelete = async (id) => {
        clearError();
        await deleteUser(id);
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
                <UserFormModal
                    onClose={() => {
                        setIsModalOpen(false);
                        setIsEditing(false);
                        setForm(defaultForm);
                    }}
                    isEditing={isEditing}
                    form={form}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    loading={loading}
                    error={valError}
                    showPassword={showPassword}
                    onClickEye={() => setShowPassword(!showPassword)}
                />
            )}
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-3xl font-bold">User Management</h1>
                <div className="flex items-center gap-2">
                    <Button onClick={() => setIsModalOpen(true)} >Add User</Button>
                    <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>

            <UserTable
                paginatedUsers={paginatedUsers}
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
                    message="Apakah Anda yakin ingin menghapus user ini?"
                    onConfirm={async () => {
                        await handleDelete(selectedId);
                        setConfirmOpen(false);
                    }}
                    onCancel={() => setConfirmOpen(false)}
                    loading={loading}
                />
            )}
        </div>
    );
}