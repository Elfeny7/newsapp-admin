import { loginAndStore, registerAndStore, clearAuth } from "../services/authService";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [valError, setValError] = useState(null);
    const [error, setError] = useState(null);
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const register = async (name, email, password, passwordConfirmation) => {
        try {
            setLoading(true);
            const user = await registerAndStore(name, email, password, passwordConfirmation);
            setUser(user);
            toast.success("Register Success");
            navigate("/");
        } catch (err) {
            if (err.code === 422) setValError(err.error);
            else setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const login = async (email, password) => {
        try {
            setLoading(true);
            const user = await loginAndStore(email, password);
            setUser(user);
            navigate("/");
        } catch (err) {
            if (err.code === 422) setValError(err.error);
            else setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        try {
            setLoading(true);
            clearAuth();
            setUser(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => { setValError(null); setError(null); };

    return {
        register,
        login,
        logout,
        loading,
        error,
        valError,
        clearError
    };
}