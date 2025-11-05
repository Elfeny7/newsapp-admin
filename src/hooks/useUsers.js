import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { fetchAllUsers, userCreate, userDelete, userUpdate } from "../services/userService";

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [error, setError] = useState(null);
    const [globalError, setGlobalError] = useState(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchAllUsers();
                setUsers(data);
            } catch (err) {
                setGlobalError(err.message || "Gagal mengambil data user");
            } finally {
                setInitialLoading(false);
            }
        }

        loadUsers();
    }, []);

    const createUser = async (form) => {
        try {
            setLoading(true);
            const newUser = await userCreate(form);
            setUsers((prev) => [...prev, newUser]);
            toast.success("Update User Success");
        } catch (err) {
            if (err.code == 422)
                setError(err.errors);
            else
                setGlobalError(err.message || "Gagal membuat user");
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (form) => {
        try {
            setLoading(true);
            await userUpdate(form.id, form);
            const updatedList = await fetchAllUsers();
            setUsers(updatedList);
            toast.success("Create User Success");
        } catch (err) {
            if (err.code == 422)
                setError(err.errors);
            else
                setGlobalError(err.message || "Gagal membuat user");
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        const prev = users;
        try {
            setLoading(true);
            await userDelete(id);
            setUsers((prev) => prev.filter((u) => u.id !== id));
            toast.success("Delete User Success");
        } catch (err) {
            setUsers(prev);
            setGlobalError(err.message || "Gagal menghapus user");
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => { setError(null); setGlobalError(null); };

    return {
        users,
        loading,
        initialLoading,
        error,
        globalError,
        createUser,
        updateUser,
        deleteUser,
        clearError,
    };
}