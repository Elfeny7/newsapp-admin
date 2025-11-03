import Button from "../components/Button";
import { ChevronDown } from "lucide-react";

export default function CategoryFormModal({
    setIsModalOpen,
    isEditing,
    setIsEditing,
    form,
    setForm,
    handleChange,
    handleSubmit,
    loading,
    error,
    categories
}) {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
                <h2 className="text-xl font-semibold mb-4">
                    {isEditing ? "Edit Category" : "Add Category"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-2">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        disabled={loading}
                        className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                    {error?.name && (
                        <p className="text-red-500 text-sm">{error.name[0]}</p>
                    )}

                    <input
                        type="text"
                        name="slug"
                        placeholder="Slug"
                        value={form.slug}
                        onChange={handleChange}
                        disabled={loading}
                        className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                    {error?.slug && (
                        <p className="text-red-500 text-sm">{error.slug[0]}</p>
                    )}

                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                        disabled={loading}
                        className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                    {error?.description && (
                        <p className="text-red-500 text-sm">{error.description[0]}</p>
                    )}
                    <div className="relative">
                        <select name="parent_id" value={form.parent_id} onChange={handleChange} disabled={loading} className="appearance-none p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed">
                            <option value="">-- No Parent --</option>
                            {categories.map((c) => {
                                if (isEditing && c.id === form.id) return null;
                                return (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                )
                            })}
                        </select>
                        <ChevronDown
                            size={18}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                        />
                    </div>
                    <div className="relative">
                        <select name="status" value={form.status} onChange={handleChange} disabled={loading} className="appearance-none p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <ChevronDown
                            size={18}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                        />
                    </div>

                    <div className="flex gap-2 pt-2">
                        <Button type="submit" disabled={loading} loading={loading}>{isEditing ? "Update Category" : "Add Category"}</Button>
                        <Button type="button" disabled={loading} onClick={() => {
                            setIsModalOpen();
                            setIsEditing();
                            setForm();
                        }} loading={loading} className="bg-gray-200 !text-gray-700 hover:bg-gray-300">Close</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}