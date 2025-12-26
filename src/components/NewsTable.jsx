import { SquarePen, Trash2 } from "lucide-react";
import { BASE_URL } from "../services/newsService";

export default function NewsTable({
    data,
    categories,
    sortField,
    sortOrder,
    setSortField,
    setSortOrder,
    onEdit,
    onDelete,
    loading
}) {
    const toggleSort = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    };

    const getSortIcon = (field) => sortField === field ? (sortOrder === "asc" ? "↑" : "↓") : "";

    return (
        <table className="table-fixed w-full text-sm text-left">
            <thead className="bg-blue-200 text-gray-700 border border-blue-300 uppercase text-xs">
                <tr>
                    <th onClick={() => toggleSort("id")} className="w-[5%] p-2 text-center cursor-pointer hover:bg-blue-300">ID {getSortIcon("id")}</th>
                    <th className="w-[10%] p-2 text-center">Image</th>
                    <th onClick={() => toggleSort("title")} className="w-[20%] p-2 cursor-pointer hover:bg-blue-300">Title {getSortIcon("title")}</th>
                    <th onClick={() => toggleSort("slug")} className="w-[15%] p-2 cursor-pointer hover:bg-blue-300">Slug {getSortIcon("slug")}</th>
                    <th onClick={() => toggleSort("excerpt")} className="w-[20%] p-2 cursor-pointer hover:bg-blue-300">Excerpt {getSortIcon("excerpt")}</th>
                    <th onClick={() => toggleSort("category_id")} className="w-[10%] p-2 cursor-pointer hover:bg-blue-300">Category {getSortIcon("category_id")}</th>
                    <th onClick={() => toggleSort("status")} className="w-[10%] p-2 cursor-pointer hover:bg-blue-300">Status {getSortIcon("status")}</th>
                    <th className="w-[10%] p-2 text-center">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
                {data.map((n) => {
                    const category = categories.find((c) => c.id === n.category_id);
                    return (
                        <tr key={n.id} className="hover:bg-blue-100 transition">
                            <td className="p-2 text-center">{n.id}</td>
                            <td className="p-2 text-center">
                                <img src={BASE_URL + n.image} alt={n.title} width="100" className="mx-auto" />
                            </td>
                            <td className="p-2">{n.title}</td>
                            <td className="p-2">{n.slug}</td>
                            <td className="p-2">{n.excerpt}</td>
                            <td className="p-2">{category ? category.name : "-"}</td>
                            <td className="p-2">{n.status}</td>
                            <td className="p-2 text-center space-x-4">
                                <button onClick={() => onEdit(n)} disabled={loading} className="cursor-pointer">
                                    <SquarePen size={20} />
                                </button>
                                <button onClick={() => onDelete(n.id)} disabled={loading} className="cursor-pointer">
                                    <Trash2 size={20} />
                                </button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}