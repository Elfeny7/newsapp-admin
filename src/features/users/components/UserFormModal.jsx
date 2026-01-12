import Button from "@/shared/components/ui/Button";
import { ChevronDown, Eye, EyeOff, X, User, Mail, Lock, Shield } from "lucide-react";
import { useState, useEffect } from "react";

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
    const [isClosing, setIsClosing] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Trigger enter animation on mount
    useEffect(() => {
        requestAnimationFrame(() => {
            setIsVisible(true);
        });
    }, []);

    const handleClose = () => {
        setIsClosing(true);
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300); // Match animation duration
    };

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {/* Backdrop with blur transition */}
            <div
                className={`absolute inset-0 ${isVisible ? 'bg-black/60' : 'bg-black/0'}`}
                style={{
                    backdropFilter: isVisible ? 'blur(4px)' : 'blur(0px)',
                    transition: isVisible
                        ? 'backdrop-filter 200ms ease-out, background-color 200ms ease-out 150ms'
                        : 'backdrop-filter 200ms ease-out 150ms, background-color 200ms ease-out'
                }}
                onClick={handleClose}
            />

            {/* Modal Container */}
            <div className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden transition-all duration-300 ${isVisible
                ? 'opacity-100 scale-100 translate-y-0'
                : 'opacity-0 scale-95 translate-y-4'
                }`}>
                {/* Header with blue gradient */}
                <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <User size={20} className="text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">
                                {isEditing ? "Edit User" : "Add New User"}
                            </h2>
                            <p className="text-blue-100 text-sm">
                                {isEditing ? "Update user information" : "Create a new user account"}
                            </p>
                        </div>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200"
                    >
                        <X size={18} className="text-white" />
                    </button>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Name Field */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <div className="relative group">
                            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter full name"
                                value={form.name}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 
                                    focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                                    focus:outline-none transition-all duration-200 
                                    disabled:opacity-60 disabled:cursor-not-allowed"
                            />
                        </div>
                        {error?.name && (
                            <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                {error.name[0]}
                            </p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Email Address</label>
                        <div className="relative group">
                            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email address"
                                value={form.email}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 
                                    focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                                    focus:outline-none transition-all duration-200 
                                    disabled:opacity-60 disabled:cursor-not-allowed"
                            />
                        </div>
                        {error?.email && (
                            <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                {error.email[0]}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <div className="relative group">
                            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder={isEditing ? "Leave blank to keep current" : "Enter password"}
                                value={form.password}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50 
                                    focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                                    focus:outline-none transition-all duration-200 
                                    disabled:opacity-60 disabled:cursor-not-allowed"
                            />
                            <button
                                type="button"
                                onClick={onClickEye}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg 
                                    text-gray-400 hover:text-gray-600 hover:bg-gray-100 
                                    transition-all duration-200"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {error?.password && (
                            <p className="text-red-500 text-sm flex items-center gap-1 mt-1">
                                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                {error.password[0]}
                            </p>
                        )}
                    </div>

                    {/* Role Select */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">User Role</label>
                        <div className="relative group">
                            <Shield size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                            <select
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                disabled={loading}
                                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-gray-50 
                                    focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 
                                    focus:outline-none transition-all duration-200 appearance-none cursor-pointer
                                    disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                <option value="superadmin">🔐 Superadmin</option>
                                <option value="journalist">✍️ Journalist</option>
                                <option value="viewer">👁️ Viewer</option>
                            </select>
                            <ChevronDown
                                size={18}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                            />
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-2"></div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                        <Button
                            type="button"
                            disabled={loading}
                            onClick={handleClose}
                            closeButton={true}
                            className="flex-1 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            loading={loading}
                            className="flex-1 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200"
                        >
                            {isEditing ? "Update User" : "Create User"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}