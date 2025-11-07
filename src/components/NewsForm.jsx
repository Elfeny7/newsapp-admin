import { ChevronDown } from "lucide-react";
import Editor from "../components/Editor";
import Button from "../components/Button";

export default function NewsForm({
    isEditing,
    form,
    handleChange,
    handleSubmit,
    loading,
    errorVal,
    categories,
    BASE_URL,
    editorOnChange
}) {

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            {isEditing && (<img className="block" src={BASE_URL + form.image} alt={form.title} width="250" />)}
            <input
                type="file"
                name="image"
                placeholder="Image"
                onChange={handleChange}
                disabled={loading}
                className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
            />
            {errorVal?.image && (
                <p className="text-red-500 text-sm">{errorVal.image[0]}</p>
            )}

            <input
                type="text"
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                disabled={loading}
                className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
            />
            {errorVal?.title && (
                <p className="text-red-500 text-sm">{errorVal.title[0]}</p>
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
            {errorVal?.slug && (
                <p className="text-red-500 text-sm">{errorVal.slug[0]}</p>
            )}

            <input
                type="text"
                name="excerpt"
                placeholder="Excerpt"
                value={form.excerpt}
                onChange={handleChange}
                disabled={loading}
                className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
            />
            {errorVal?.excerpt && (
                <p className="text-red-500 text-sm">{errorVal.excerpt[0]}</p>
            )}
            <Editor
                value={form.content}
                onChange={editorOnChange}
                disabled={loading}
            />
            {errorVal?.content && (
                <p className="text-red-500 text-sm">{errorVal.content[0]}</p>
            )}

            <div className="relative">
                <select name="category_id" value={form.category_id} onChange={handleChange} disabled={loading} className="appearance-none p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed">
                    <option value="" disabled hidden>Pilih Kategori</option>
                    {categories.map((c) => {
                        if (c.status === "inactive") return null;
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
            {errorVal?.category_id && (
                <p className="text-red-500 text-sm">{errorVal.category_id[0]}</p>
            )}
            <div className="relative">
                <select name="status" value={form.status} onChange={handleChange} disabled={loading} className="appearance-none p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
                <ChevronDown
                    size={18}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                />
            </div>
            <Button type="submit" loading={loading} className="mt-4">{isEditing ? "Update News" : "Add News"}</Button>
        </form>
    );
}