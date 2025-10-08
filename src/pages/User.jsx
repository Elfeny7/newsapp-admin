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
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "viewer",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [globalError, setGlobalError] = useState(null);

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

    const handleCancel = () => {
        setError(null);
        setForm({
            name: "",
            email: "",
            password: "",
            role: "viewer",
        });
        setIsEditing(false);
    }

    if (initialLoading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <form onSubmit={handleSubmit} className="mb-6 space-y-2">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={loading}
                    className="border p-2 w-full rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                {error?.name && (
                    <p className="text-red-500 text-sm">
                        {error.name[0]}
                    </p>
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={loading}
                    className="border p-2 w-full rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                {error?.email && (
                    <p className="text-red-500 text-sm">
                        {error.email[0]}
                    </p>
                )}
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        disabled={loading}
                        className="border p-2 w-full rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    {error?.password && (
                        <p className="text-red-500 text-sm">
                            {error.password[0]}
                        </p>
                    )}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                    >
                        {showPassword ? "🙈" : "👁"}
                    </button>
                </div>
                <select name="role" value={form.role} onChange={handleChange} disabled={loading} className="border p-2 w-full rounded cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed">
                    <option value="superadmin">Superadmin</option>
                    <option value="journalist">Journalist</option>
                    <option value="viewer">Viewer</option>
                </select>
                <button
                    type="submit"
                    disabled={loading}
                    className={`bg-blue-500 text-white px-4 py-2 rounded w-full flex items-center justify-center cursor-pointer transition-all min-h-[40px] ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-600"
                        }`}
                >
                    {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                    ) : (
                        <span>{isEditing ? "Update User" : "Add User"}</span>
                    )}
                </button>
                {isEditing && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={loading}
                        className={`text-white px-3 py-2 rounded w-full ${loading ? "bg-red-300 opacity-70 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 cursor-pointer"} `}
                    >
                        Cancel Edit
                    </button>
                )}
            </form>

            <table className="w-full border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Role</th>
                        <th className="border p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td className="border p-2">{u.id}</td>
                            <td className="border p-2">{u.name}</td>
                            <td className="border p-2">{u.email}</td>
                            <td className="border p-2">{u.role}</td>
                            <td className="border p-2 space-x-2">
                                <button
                                    onClick={() => handleEdit(u)}
                                    disabled={loading}
                                    className={`px-2 py-1 rounded ${loading
                                        ? "bg-yellow-300 text-white opacity-70 cursor-not-allowed"
                                        : "bg-yellow-500 text-white hover:bg-yellow-600 cursor-pointer"
                                        }`}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(u.id)}
                                    disabled={loading}
                                    className={`px-2 py-1 rounded ${loading
                                            ? "bg-red-300 text-white opacity-70 cursor-not-allowed"
                                            : "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                                        }`}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {users.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center p-4 text-gray-500">
                                No users found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
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
