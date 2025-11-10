import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import * as userService from "../services/userService";

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [valError, setValError] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await userService.getAll();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setInitialLoading(false);
            }
        }

        loadUsers();
    }, []);

    const createUser = async (form) => {
        try {
            setLoading(true);
            const newUser = await userService.create(form);
            setUsers((prev) => [...prev, newUser]);
            toast.success("Update User Success");
        } catch (err) {
            if (err.code === 422) setValError(err.errors);
            else setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (form) => {
        try {
            setLoading(true);
            await userService.update(form.id, form);
            const updatedList = await userService.getAll();
            setUsers(updatedList);
            toast.success("Update User Success");
        } catch (err) {
            if (err.code === 422) setValError(err.errors);
            else setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        const prev = users;
        try {
            setLoading(true);
            await userService.remove(id);
            setUsers((prev) => prev.filter((u) => u.id !== id));
            toast.success("Delete User Success");
        } catch (err) {
            setUsers(prev);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => { setValError(null); setError(null); };

    return {
        users,
        loading,
        initialLoading,
        valError,
        error,
        createUser,
        updateUser,
        deleteUser,
        clearError,
    };
}