import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ModalError from "../components/ModalError";

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
        <div className="flex h-screen bg-gray-100 justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="p-6 bg-white shadow-md rounded w-80 relative"
            >
                <h1 className="text-xl mb-4">Login</h1>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed mb-2"
                />
                {valError?.email && (
                    <p className="text-red-500 text-sm mb-2">{valError.email[0]}</p>
                )}
                <div className="relative mb-2">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        className="p-3 w-full rounded-lg bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                {valError?.password && (
                    <p className="text-red-500 text-sm mb-2">{valError.password[0]}</p>
                )}
                <Button type="submit" loading={loading} disabled={loading} className="mt-2 w-full">Login</Button>
            </form>
            {error && (
                <ModalError
                    message={error}
                    onClose={clearError}
                />
            )}
        </div>
    );
}
