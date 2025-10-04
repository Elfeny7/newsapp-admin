import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllUsers, userCreate, userDelete, userUpdate } from "../services/userService";

export default function User() {
    const [users, setUsers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            if (isEditing) {
                await userUpdate(form.id, form);
                const freshUsers = await fetchAllUsers();
                setUsers(freshUsers);
                setIsEditing(false);
            } else {
                const newUser = await userCreate(form);
                setUsers((prev) => [...prev, newUser]);
            }

            setForm({ name: "", email: "", password: "", role: "viewer" });
        } catch (err) {
            setError(err.message || "Gagal menyimpan data");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (user) => {
        setForm(user);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await userDelete(id);
            setUsers(users.filter((u) => u.id !== id));
        } catch (err) {
            setError(err.message || "Gagal menghapus user");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setForm({
            name: "",
            email: "",
            password: "",
            role: "viewer",
        });
        setIsEditing(false);
    }


    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="mb-6 space-y-2">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />
                <select name="role" value={form.role} onChange={handleChange} className="border p-2 w-full rounded cursor-pointer">
                    <option value="superadmin">Superadmin</option>
                    <option value="journalist">Journalist</option>
                    <option value="viewer">Viewer</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-2 rounded w-full cursor-pointer"
                >
                    {isEditing ? "Update User" : "Add User"}
                </button>
                {isEditing && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-red-700 text-white px-3 py-2 rounded w-full cursor-pointer"
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
                                    className="bg-yellow-500 text-white px-2 py-1 rounded cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(u.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
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
        </div>
    );
}
