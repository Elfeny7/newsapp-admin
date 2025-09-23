import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/authtemp/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await login(email, password);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login gagal");
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
        <div className="flex h-screen justify-center items-center">
            <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded w-80">
                <h1 className="text-xl mb-4">Login Admin</h1>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full mb-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full mb-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 w-full">
                    Login
                </button>
            </form>
        </div>
    );
}
