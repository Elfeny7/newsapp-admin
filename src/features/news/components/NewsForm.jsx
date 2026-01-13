import { ChevronDown, Image, Type, Link2, FileText, Folder, Eye } from "lucide-react";
import Editor from "@/shared/components/ui/Editor";
import Button from "@/shared/components/ui/Button";

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
    const inputBaseClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed";
    const labelClass = "flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2";
    const errorClass = "mt-1.5 text-red-500 text-xs font-medium flex items-center gap-1";

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-2">
                <label className={labelClass}>
                    <Image size={16} className="text-gray-500" />
                    <span>Gambar Thumbnail</span>
                    {!isEditing && <span className="text-red-400">*</span>}
                </label>

                {isEditing && form.image && typeof form.image === 'string' && (
                    <div className="relative group mb-3">
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                            <img
                                src={BASE_URL + form.image}
                                alt={form.title}
                                className="w-full max-w-sm h-48 object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 max-w-sm bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                            <span className="text-white text-sm font-medium">Ganti gambar di bawah</span>
                        </div>
                    </div>
                )}

                <div className="relative">
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        disabled={loading}
                        className="w-full file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 file:cursor-pointer hover:file:bg-blue-100 file:transition-colors text-sm text-gray-500 border border-gray-200 rounded-xl bg-gray-50 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                </div>
                {errorVal?.image && (
                    <p className={errorClass}>
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errorVal.image[0]}
                    </p>
                )}
            </div>

            {/* Title Input */}
            <div className="space-y-2">
                <label className={labelClass}>
                    <Type size={16} className="text-gray-500" />
                    <span>Judul Berita</span>
                    <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    name="title"
                    placeholder="Masukkan judul berita yang menarik..."
                    value={form.title}
                    onChange={handleChange}
                    disabled={loading}
                    className={inputBaseClass}
                />
                {errorVal?.title && (
                    <p className={errorClass}>
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errorVal.title[0]}
                    </p>
                )}
            </div>

            {/* Slug Input */}
            <div className="space-y-2">
                <label className={labelClass}>
                    <Link2 size={16} className="text-gray-500" />
                    <span>Slug URL</span>
                    <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    name="slug"
                    placeholder="judul-berita-dalam-format-url"
                    value={form.slug}
                    onChange={handleChange}
                    disabled={loading}
                    className={`${inputBaseClass} font-mono text-sm`}
                />
                {errorVal?.slug && (
                    <p className={errorClass}>
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errorVal.slug[0]}
                    </p>
                )}
            </div>

            {/* Excerpt Input */}
            <div className="space-y-2">
                <label className={labelClass}>
                    <FileText size={16} className="text-gray-500" />
                    <span>Ringkasan</span>
                    <span className="text-red-400">*</span>
                </label>
                <textarea
                    name="excerpt"
                    placeholder="Tulis ringkasan singkat yang menjelaskan inti berita..."
                    value={form.excerpt}
                    onChange={handleChange}
                    disabled={loading}
                    rows={3}
                    className={`${inputBaseClass} resize-none`}
                />
                {errorVal?.excerpt && (
                    <p className={errorClass}>
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errorVal.excerpt[0]}
                    </p>
                )}
            </div>

            {/* Content Editor */}
            <div className="space-y-2">
                <label className={labelClass}>
                    <FileText size={16} className="text-gray-500" />
                    <span>Konten Berita</span>
                    <span className="text-red-400">*</span>
                </label>
                <div className="rounded-xl overflow-hidden border border-gray-200 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50 transition-all">
                    <Editor
                        value={form.content}
                        onChange={editorOnChange}
                        disabled={loading}
                    />
                </div>
                {errorVal?.content && (
                    <p className={errorClass}>
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errorVal.content[0]}
                    </p>
                )}
            </div>

            {/* Category and Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category Select */}
                <div className="space-y-2">
                    <label className={labelClass}>
                        <Folder size={16} className="text-gray-500" />
                        <span>Kategori</span>
                        <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                        <select
                            name="category_id"
                            value={form.category_id}
                            onChange={handleChange}
                            disabled={loading}
                            className={`${inputBaseClass} appearance-none cursor-pointer pr-10`}
                        >
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
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                    </div>
                    {errorVal?.category_id && (
                        <p className={errorClass}>
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errorVal.category_id[0]}
                        </p>
                    )}
                </div>

                {/* Status Select */}
                <div className="space-y-2">
                    <label className={labelClass}>
                        <Eye size={16} className="text-gray-500" />
                        <span>Status Publikasi</span>
                    </label>
                    <div className="relative">
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            disabled={loading}
                            className={`${inputBaseClass} appearance-none cursor-pointer pr-10`}
                        >
                            <option value="draft">📝 Draft</option>
                            <option value="published">✅ Published</option>
                        </select>
                        <ChevronDown
                            size={18}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        />
                    </div>
                </div>
            </div>

            {/* Submit Section */}
            <div className="pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        <span className="text-red-400">*</span> Wajib diisi
                    </p>
                    <Button
                        type="submit"
                        loading={loading}
                        className="!px-8 !py-3 !rounded-xl !text-sm !font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200"
                    >
                        {isEditing ? "💾 Simpan Perubahan" : "🚀 Publikasikan Berita"}
                    </Button>
                </div>
            </div>
        </form>
    );
}