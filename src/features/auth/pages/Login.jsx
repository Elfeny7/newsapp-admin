import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/shared/components/ui/Button";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import ModalError from "@/shared/components/ui/ModalError";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const {
        login,
        loading,
        error,
        valError,
        clearError
    } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 flex-col justify-between relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>

                {/* Logo/Brand */}
                <div className="relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-xl">N</span>
                        </div>
                        <span className="text-white text-2xl font-bold">NewsApp</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 space-y-6">
                    <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                        Kelola Berita<br />dengan Mudah
                    </h1>
                    <p className="text-blue-100 text-lg max-w-md">
                        Platform admin untuk mengelola konten berita, kategori, dan pengguna dengan antarmuka yang intuitif.
                    </p>
                    <div className="flex gap-8 pt-4">
                        <div>
                            <p className="text-3xl font-bold text-white">100+</p>
                            <p className="text-blue-200 text-sm">Berita Terbit</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">50+</p>
                            <p className="text-blue-200 text-sm">Kategori</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-white">10+</p>
                            <p className="text-blue-200 text-sm">Pengguna</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="relative z-10">
                    <p className="text-blue-200 text-sm">© 2026 NewsApp. All rights reserved.</p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-xl">N</span>
                        </div>
                        <span className="text-gray-800 text-2xl font-bold">NewsApp</span>
                    </div>

                    {/* Form Container */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-gray-800">Selamat Datang!</h2>
                            <p className="text-gray-500 mt-2">Masuk ke akun admin Anda</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="nama@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                                />
                                {valError?.email && (
                                    <p className="text-red-500 text-sm mt-1">{valError.email[0]}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Masukkan password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={loading}
                                        className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {valError?.password && (
                                    <p className="text-red-500 text-sm mt-1">{valError.password[0]}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                loading={loading}
                                disabled={loading}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40"
                            >
                                Masuk
                            </Button>
                        </form>

                        {/* Register Link */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-500">
                                Belum punya akun?{" "}
                                <Link
                                    to="/register"
                                    className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                                >
                                    Daftar Sekarang
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Footer for mobile */}
                    <p className="lg:hidden text-center text-gray-400 text-sm mt-8">
                        © 2026 NewsApp. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Error Modal */}
            {error && (
                <ModalError
                    message={error}
                    onClose={clearError}
                />
            )}
        </div>
    );
}
