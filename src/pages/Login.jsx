import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.message || "Login gagal");
        }
    };

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
