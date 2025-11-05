import Button from "../components/Button";
import { ChevronDown, Eye, EyeOff } from "lucide-react";

export default function UserFormModal({
    isEditing,
    form,
    handleChange,
    handleSubmit,
    loading,
    error,
    onClose,
    showPassword,
    onClickEye
}) {

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
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
                        className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
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
                        className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
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
                            className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                        />
                        <button
                            type="button"
                            onClick={onClickEye}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {error?.password && (
                        <p className="text-red-500 text-sm">{error.password[0]}</p>
                    )}
                    <div className="relative">
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            disabled={loading}
                            className="appearance-none p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed"
                        >
                            <option value="superadmin">Superadmin</option>
                            <option value="journalist">Journalist</option>
                            <option value="viewer">Viewer</option>
                        </select>
                        <ChevronDown
                            size={18}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                        />
                    </div>

                    <div className="flex gap-2 pt-2">
                        <Button type="submit" disabled={loading} loading={loading} className="flex-1">{isEditing ? "Update User" : "Add User"}</Button>
                        <Button type="button" disabled={loading} onClick={onClose} closeButton={true} className="flex-1">Close</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}