import Button from "@/shared/components/ui/Button";
import { X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export default function CategoryFormModal({
    isEditing,
    form,
    handleChange,
    handleSubmit,
    loading,
    error,
    categories,
    onClose
}) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    const handleClose = () => {
        setShow(false);
        setTimeout(onClose, 250);
    };

    const inputClass = "w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all disabled:opacity-60";
    const selectClass = `${inputClass} appearance-none cursor-pointer`;

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-250 ${show ? 'opacity-100' : 'opacity-0'}`}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

            {/* Modal */}
            <div className={`relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 transition-all duration-250 ${show ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">
                        {isEditing ? "Edit Category" : "Add Category"}
                    </h2>
                    <button onClick={handleClose} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                        <X size={18} className="text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    {/* Name */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Name</label>
                        <input type="text" name="name" placeholder="Category name" value={form.name} onChange={handleChange} disabled={loading} className={inputClass} />
                        {error?.name && <p className="text-red-500 text-sm mt-1">{error.name[0]}</p>}
                    </div>

                    {/* Slug */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Slug</label>
                        <input type="text" name="slug" placeholder="category-slug" value={form.slug} onChange={handleChange} disabled={loading} className={inputClass} />
                        {error?.slug && <p className="text-red-500 text-sm mt-1">{error.slug[0]}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Description</label>
                        <input type="text" name="description" placeholder="Short description" value={form.description} onChange={handleChange} disabled={loading} className={inputClass} />
                        {error?.description && <p className="text-red-500 text-sm mt-1">{error.description[0]}</p>}
                    </div>

                    {/* Parent Category */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Parent</label>
                        <div className="relative">
                            <select name="parent_id" value={form.parent_id} onChange={handleChange} disabled={loading} className={selectClass}>
                                <option value="">-- No Parent --</option>
                                {categories.map((c) => {
                                    if (isEditing && c.id === form.id) return null;
                                    return <option key={c.id} value={c.id}>{c.name}</option>;
                                })}
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
                        <div className="relative">
                            <select name="status" value={form.status} onChange={handleChange} disabled={loading} className={selectClass}>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                </form>

                {/* Footer */}
                <div className="flex justify-end gap-3 px-5 py-4 border-t border-gray-200 rounded-b-2xl">
                    <Button type="button" onClick={handleClose} disabled={loading} closeButton>Cancel</Button>
                    <Button type="submit" disabled={loading} loading={loading} onClick={handleSubmit} className="px-10">{isEditing ? "Update" : "Create"}</Button>
                </div>
            </div>
        </div>
    );
}