import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter(page =>
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 2 && page <= currentPage + 2)
        );

    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded bg-gray-200 cursor-pointer hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronLeft size={20} />
            </button>

            {pages.map((page, index) => {
                const prevPage = pages[index - 1];
                const showDots = prevPage && page - prevPage > 1;
                return (
                    <React.Fragment key={page}>
                        {showDots && <span>…</span>}
                        <button
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-1 rounded transition-colors ${currentPage === page
                                    ? "bg-blue-500 text-white cursor-pointer"
                                    : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                                }`}
                        >
                            {page}
                        </button>
                    </React.Fragment>
                );
            })}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded bg-gray-200 cursor-pointer hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
}
