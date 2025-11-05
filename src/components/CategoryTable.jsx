import { SquarePen, Trash2} from "lucide-react";

export default function CategoryTable({
    paginatedCategories,
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
                    <th onClick={() => toggleSort("id")} className="zw-[5%] p-2 py-3 text-center cursor-pointer hover:bg-blue-300">ID {getSortIcon("id")}</th>
                    <th onClick={() => toggleSort("name")} className="w-[15%] p-2 cursor-pointer hover:bg-blue-300">Name {getSortIcon("name")}</th>
                    <th onClick={() => toggleSort("slug")} className="w-[15%] p-2 cursor-pointer hover:bg-blue-300">Slug </th>
                    <th onClick={() => toggleSort("description")} className="w-[35%] p-2 cursor-pointer hover:bg-blue-300">Description {getSortIcon("description")}</th>
                    <th onClick={() => toggleSort("parent_id")} className="w-[15%] p-2 cursor-pointer hover:bg-blue-300">Parent {getSortIcon("parent_id")}</th>
                    <th onClick={() => toggleSort("status")} className="w-[10%] p-2 cursor-pointer hover:bg-blue-300">Status {getSortIcon("status")}</th>
                    <th className="w-[5%] p-2 text-center">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-blue-100">
                {paginatedCategories.map((c) => {
                    const parent = categories.find((p) => p.id === c.parent_id);
                    return (
                        <tr key={c.id} className="hover:bg-blue-100 transition">
                            <td className="p-2 text-center">{c.id}</td>
                            <td className="p-2">{c.name}</td>
                            <td className="p-2">{c.slug}</td>
                            <td className="p-2">{c.description}</td>
                            <td className="p-2">{parent ? parent.name : "-"}</td>
                            <td className="p-2">{c.status}</td>
                            <td className="p-2 space-x-4 text-center">
                                <button onClick={() => onEdit(c)} disabled={loading} className="cursor-pointer">
                                    <SquarePen size={20} />
                                </button>
                                <button onClick={() => onDelete(c.id)} disabled={loading} className="cursor-pointer">
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