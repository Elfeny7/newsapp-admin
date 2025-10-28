import { useMemo } from "react";

export const useFilteredSortedNews = ({
    news,
    categories,
    search,
    sortField,
    sortOrder,
    currentPage,
    itemsPerPage,
}) => {
    const categoryMap = useMemo(
        () => Object.fromEntries(categories.map((c) => [c.id, c.name])),
        [categories]
    );

    const filteredNews = useMemo(() => {
        const searchTerm = search.toLowerCase();
        return news.filter((item) => {
            const category = categories.find((c) => c.id === item.category_id);
            const categoryName = category ? category.name.toLowerCase() : "";

            return (
                item.id.toString().includes(searchTerm) ||
                item.title.toLowerCase().includes(searchTerm) ||
                item.slug.toLowerCase().includes(searchTerm) ||
                item.excerpt.toLowerCase().includes(searchTerm) ||
                categoryName.includes(searchTerm) ||
                item.content.toLowerCase().includes(searchTerm) ||
                item.status.toLowerCase().includes(searchTerm)
            );
        });
    }, [news, categories, search]);

    const sortedNews = useMemo(() => {
        return [...filteredNews].sort((a, b) => {
            if (sortField === "category_id") {
                const categoryNameA = categoryMap[a.category_id] || "";
                const categoryNameB = categoryMap[b.category_id] || "";
                return sortOrder === "asc"
                    ? categoryNameA.localeCompare(categoryNameB)
                    : categoryNameB.localeCompare(categoryNameA);
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
    }, [filteredNews, sortField, sortOrder, categoryMap]);

    const totalPages = Math.ceil(sortedNews.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedNews = sortedNews.slice(startIndex, startIndex + itemsPerPage);

    return {
        filteredNews,
        sortedNews,
        paginatedNews,
        totalPages,
        categoryMap,
    };
};
