import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllCategories, categoryCreate, categoryDelete, categoryUpdate } from "../services/categoryService";

export default function Category() {
    const [categories, setCategories] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        name: "",
        slug: "",
        description: "",
        parent_id: "",
        status: "active"
    });

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchAllCategories();
                setCategories(data);
            } catch (err) {
                setError(err.message || "Gagal mengambil data kategori");
            } finally {
                setLoading(false);
            }
        };

        loadCategories();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            if (isEditing) {
                await categoryUpdate(form.id, form);
                const freshCategories = await fetchAllCategories();
                setCategories(freshCategories);
                setIsEditing(false);
            } else {
                const newCategories = await categoryCreate(form);
                setCategories((prev) => [...prev, newCategories]);
            }

            setForm({
                name: "",
                slug: "",
                description: "",
                parent: "",
                status: "active"
            });
        } catch (err) {
            setError(err.message || "Gagal menyimpan data");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (category) => {
        setForm(category);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await categoryDelete(id);
            setCategories(categories.filter((u) => u.id !== id));
        } catch (err) {
            setError(err.message || "Gagal menghapus kategori");
        } finally {
            setLoading(false);
        }
    };


    if (loading) return (
        <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Category Management</h1>
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
                    type="text"
                    name="slug"
                    placeholder="Slug"
                    value={form.slug}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                />
                <select name="parent" value={form.parent} onChange={handleChange} className="border p-2 w-full rounded cursor-pointer">
                    <option value="">-- No Parent --</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </select>
                <select name="status" value={form.status} onChange={handleChange} className="border p-2 w-full rounded cursor-pointer">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-3 py-2 rounded w-full cursor-pointer"
                >
                    {isEditing ? "Update Category" : "Add Category"}
                </button>
            </form>

            <table className="w-full border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Slug</th>
                        <th className="border p-2">Description</th>
                        <th className="border p-2">Parent</th>
                        <th className="border p-2">Status</th>
                        <th className="border p-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((c) => {
                        const parent = categories.find((p) => p.id === c.parent_id);
                        return (
                            <tr key={c.id}>
                                <td className="border p-2">{c.id}</td>
                                <td className="border p-2">{c.name}</td>
                                <td className="border p-2">{c.slug}</td>
                                <td className="border p-2">{c.description}</td>
                                <td className="border p-2">
                                    {parent ? parent.name : "-"}
                                </td>
                                <td className="border p-2">{c.status}</td>
                                <td className="border p-2 space-x-2">
                                    <button
                                        onClick={() => handleEdit(c)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded cursor-pointer"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(c.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    {categories.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center p-4 text-gray-500">
                                No categories found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Link to="/" className="text-blue-500 hover:underline">Back to Dashboard</Link>
        </div >
    );
}