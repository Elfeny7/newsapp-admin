import { useMemo } from "react";

export const useFilteredSortedUser = ({
    users,
    search,
    sortField,
    sortOrder,
    currentPage,
    itemsPerPage,
}) => {
    const filteredUsers = useMemo(() => {
        const searchTerm = search.toLowerCase();
        return users.filter((user) =>
            user.id.toString().toLowerCase().includes(searchTerm) ||
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.role.toLowerCase().includes(searchTerm)
        );
    }, [users, search]);

    const sortedUsers = useMemo(() => {
        return [...filteredUsers].sort((a, b) => {
            const fieldA = a[sortField];
            const fieldB = b[sortField];

            if (typeof fieldA === "number" && typeof fieldB === "number") {
                return sortOrder === "asc" ? fieldA - fieldB : fieldB - fieldA;
            }

            const valueA = String(fieldA).toLowerCase();
            const valueB = String(fieldB).toLowerCase();

            if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
            if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
    }, [filteredUsers, sortField, sortOrder]);

    const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);

    return {
        paginatedUsers,
        totalPages,
    };
}