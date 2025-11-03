import { useMemo } from "react";

export const useFilteredSortedCategory = ({
    categories,
    search,
    sortField,
    sortOrder,
    currentPage,
    itemsPerPage,
}) => {
    const filteredCategories = useMemo(() => {
        const searchTerm = search.toLowerCase();
        return categories.filter((category) => {
            const parent = categories.find((p) => p.id === category.parent_id);
            const parentName = parent ? parent.name.toLowerCase() : "";
            return (
                category.id.toString().includes(searchTerm) ||
                category.name.toLowerCase().includes(searchTerm) ||
                category.slug.toLowerCase().includes(searchTerm) ||
                category.description.toLowerCase().includes(searchTerm) ||
                parentName.includes(searchTerm) ||
                category.status.toLowerCase().includes(searchTerm)
            );
        });
    }, [categories, search]);

    const categoryMap = Object.fromEntries(categories.map(c => [c.id, c.name]));

    const sortedCategories = useMemo(() => {
        return [...filteredCategories].sort((a, b) => {
            if (sortField === "parent_id") {
                const parentNameA = categoryMap[a.parent_id] || "";
                const parentNameB = categoryMap[b.parent_id] || "";
                return sortOrder === "asc"
                    ? parentNameA.localeCompare(parentNameB)
                    : parentNameB.localeCompare(parentNameA);
            }

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
    }, [categoryMap, filteredCategories, sortField, sortOrder]);

    const totalPages = Math.ceil(sortedCategories.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCategories = sortedCategories.slice(startIndex, startIndex + itemsPerPage);

    return {
        paginatedCategories,
        totalPages,
    };

}