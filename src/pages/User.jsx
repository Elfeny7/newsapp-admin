import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllUsers, userCreate, userDelete, userUpdate } from "../services/userService";
import ModalError from "../components/ModalError";
import toast from "react-hot-toast";

export default function User() {
    const [users, setUsers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [globalError, setGlobalError] = useState(null);
    const [search, setSearch] = useState("");
    const [sortField, setSortField] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [editingUserId, setEditingUserId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "viewer",
    });

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchAllUsers();
                setUsers(data);
            } catch (err) {
                setError(err.message || "Gagal mengambil data users");
            } finally {
                setInitialLoading(false);
            }
        };

        loadUsers();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);

        try {
            setLoading(true);

            if (isEditing) {
                const payload = { ...form };
                if (!payload.password) delete payload.password;
                await userUpdate(form.id, payload);
                const freshUsers = await fetchAllUsers();
                setUsers(freshUsers);
                setIsEditing(false);
                setEditingUserId(null);
                toast.success("Update User Success");
            } else {
                const newUser = await userCreate(form);
                setUsers((prev) => [...prev, newUser]);
                toast.success("Create User Success");
            }

            setForm({ name: "", email: "", password: "", role: "viewer" });
        } catch (err) {
            if (err.code == 422)
                setError(err.errors);
            else
                setGlobalError(err.message || "Terjadi kesalahan saat menyimpan data");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (user) => {
        setError(null);
        setForm({
            ...form,
            ...user,
            password: "",
        });
        setEditingUserId(user.id);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        setError(null);
        try {
            setLoading(true);
            await userDelete(id);
            setUsers(users.filter((u) => u.id !== id));
            toast.success("Delete User Success");
        } catch (err) {
            setError(err.message || "Gagal menghapus user");
        } finally {
            setLoading(false);
        }
    };

    // const handleCancel = () => {
    //     setError(null);
    //     setForm({
    //         name: "",
    //         email: "",
    //         password: "",
    //         role: "viewer",
    //     });
    //     setEditingUserId(null);
    //     setIsEditing(false);
    // }

    const filteredUsers = users.filter(
        (user) =>
            user.id.toString().toLowerCase().includes(search.toLowerCase()) ||
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.role.toLowerCase().includes(search.toLowerCase())
    );

    const sortedUsers = [...filteredUsers].sort((a, b) => {
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

    const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);

    if (initialLoading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="p-6">
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                        <h2 className="text-xl font-semibold mb-4">
                            {isEditing ? "Edit User" : "Add User"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-2">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={form.name}
                                onChange={handleChange}
                                disabled={loading}
                                className="border p-2 w-full rounded disabled:bg-gray-100"
                            />
                            {error?.name && (
                                <p className="text-red-500 text-sm">{error.name[0]}</p>
                            )}

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                disabled={loading}
                                className="border p-2 w-full rounded disabled:bg-gray-100"
                            />
                            {error?.email && (
                                <p className="text-red-500 text-sm">{error.email[0]}</p>
                            )}

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                    disabled={loading}
                                    className="border p-2 w-full rounded disabled:bg-gray-100"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                                >
                                    {showPassword ? "🙈" : "👁"}
                                </button>
                            </div>
                            {error?.password && (
                                <p className="text-red-500 text-sm">{error.password[0]}</p>
                            )}

                            <select
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                disabled={loading}
                                className="border p-2 w-full rounded cursor-pointer disabled:bg-gray-100"
                            >
                                <option value="superadmin">Superadmin</option>
                                <option value="journalist">Journalist</option>
                                <option value="viewer">Viewer</option>
                            </select>

                            <div className="flex gap-2 pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`bg-blue-500 text-white px-4 py-2 rounded flex-1 ${loading
                                        ? "opacity-70 cursor-not-allowed"
                                        : "hover:bg-blue-600 cursor-pointer"
                                        }`}
                                >
                                    {loading ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mx-auto"></div>
                                    ) : (
                                        <span>{isEditing ? "Update User" : "Add User"}</span>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setIsEditing(false);
                                        setEditingUserId(null);
                                        setForm({ name: "", email: "", password: "", role: "viewer" });
                                    }}
                                    disabled={loading}
                                    className={`bg-gray-300 text-gray-700 px-4 py-2 rounded flex-1 ${loading
                                        ? "opacity-70 cursor-not-allowed"
                                        : "hover:bg-gray-400 cursor-pointer"
                                        }`}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                            ✖
                        </button>
                    </div>
                </div>
            )}
            <div className="flex items-center justify-between mb-3">
                <h1 className="text-2xl font-bold">User Management</h1>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors cursor-pointer"
                    >
                        Add User
                    </button>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded p-2 w-[200px]"
                    />

                </div>
            </div>

            <table className="table-fixed w-full border border-gray-300 text-sm text-left">
                <thead className="bbg-gray-100 text-gray-700 uppercase text-xs">
                    <tr>
                        <th className="w-[60px] border p-2 text-center cursor-pointer hover:bg-gray-50" onClick={() => {
                            setSortField("id");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}>ID {sortField === "id" && (sortOrder === "asc" ? "↑" : "↓")}</th>
                        <th className="w-[30%] border p-2 cursor-pointer hover:bg-gray-50" onClick={() => {
                            setSortField("name");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}>Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")} </th>
                        <th className="w-[30%] border p-2 cursor-pointer hover:bg-gray-50" onClick={() => {
                            setSortField("email");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}>Email {sortField === "email" && (sortOrder === "asc" ? "↑" : "↓")}</th>
                        <th className="w-[15%] border p-2 cursor-pointer hover:bg-gray-50" onClick={() => {
                            setSortField("role");
                            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}>Role {sortField === "role" && (sortOrder === "asc" ? "↑" : "↓")}</th>
                        <th className="w-[15%] border p-2 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                    {paginatedUsers.map((u) => {
                        const isEditingThisRow = editingUserId === u.id;
                        return (
                            <tr key={u.id} className={`hover:bg-gray-50 transition ${isEditingThisRow ? "bg-gray-200" : ""}`}>
                                <td className="border p-2 text-center">{u.id}</td>
                                <td className="border p-2">{u.name}</td>
                                <td className="border p-2">{u.email}</td>
                                <td className="border p-2">{u.role}</td>
                                <td className="border p-2 space-x-2 text-center">
                                    <button
                                        onClick={() => handleEdit(u)}
                                        disabled={loading}
                                        className={`px-2 py-1 rounded transition-colors ${loading
                                            ? "bg-yellow-300 text-white opacity-70 cursor-not-allowed"
                                            : "bg-yellow-500 text-white hover:bg-yellow-600 cursor-pointer"
                                            }`}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(u.id)}
                                        disabled={loading}
                                        className={`px-2 py-1 rounded transition-colors ${loading
                                            ? "bg-red-300 text-white opacity-70 cursor-not-allowed"
                                            : "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                                            }`}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center p-6 text-gray-500">
                                <div className="flex flex-col items-center">
                                    <span>🫥</span>
                                    <span className="mt-2">No users found</span>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {totalPages > 0 && (
                <div className="flex justify-center items-center mt-4 space-x-2">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded cursor-pointer transition-colors bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded cursor-pointer transition-colors ${currentPage === i + 1
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded cursor-pointer transition-colors bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>)}

            <Link to="/" className="text-blue-500 hover:underline">Back to Dashboard</Link>
            {globalError && (
                <ModalError
                    message={globalError}
                    onClose={() => setGlobalError(null)}
                />
            )}
        </div>
    );
}
