import { SquarePen, Trash2} from "lucide-react";

export default function UserTable({
    paginatedUsers,
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
    }
    const getSortIcon = (field) => sortField === field ? (sortOrder === "asc" ? "↑" : "↓") : "";

    return (
        <table className="table-fixed w-full text-sm text-left">
            <thead className="bg-blue-200 text-gray-700 border border-blue-300 uppercase text-xs">
                <tr>
                    <th onClick={() => toggleSort("id")} className="w-[5%] p-2 py-3 text-center cursor-pointer hover:bg-blue-300">ID {getSortIcon("id")}</th>
                    <th onClick={() => toggleSort("name")} className="w-[35%] p-2 cursor-pointer hover:bg-blue-300">Name {getSortIcon("name")}</th>
                    <th onClick={() => toggleSort("email")} className="w-[35%] p-2 cursor-pointer hover:bg-blue-300">Email {getSortIcon("email")}</th>
                    <th onClick={() => toggleSort("role")} className="w-[15%] p-2 cursor-pointer hover:bg-blue-300">Role {getSortIcon("role")}</th>
                    <th className="w-[10%] p-2 text-center">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-blue-100 ">
                {paginatedUsers.map((u) => {
                    return (
                        <tr key={u.id} className="hover:bg-blue-100 transition">
                            <td className="p-2 text-center">{u.id}</td>
                            <td className="p-2">{u.name}</td>
                            <td className="p-2">{u.email}</td>
                            <td className="p-2">{u.role}</td>
                            <td className="p-2 space-x-4 text-center">
                                <button onClick={() => onEdit(u)} disabled={loading} className={"cursor-pointer"}>
                                    <SquarePen size={20} />
                                </button>
                                <button onClick={() => onDelete(u)} disabled={loading} className={"cursor-pointer"}>
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