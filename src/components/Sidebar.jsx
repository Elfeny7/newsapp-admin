import { useState } from "react";
import { Menu, ChevronRight, ChevronLeft , House, Users, LayoutGrid, Newspaper } from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPinned, setIsPinned] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        if (!isPinned) setIsOpen(!isOpen);
    };

    const menuItems = [
        { path: "/", label: "Dashboard", icon: <House size={20} /> },
        { path: "/users", label: "Users", icon: <Users size={20} /> },
        { path: "/categories", label: "Categories", icon: <LayoutGrid size={20} /> },
        { path: "/news", label: "News", icon: <Newspaper size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-gray-200 overflow-hidden">
            <div
                className={`relative bg-white shadow-lg transition-[width] duration-300 ease-in-out ${isOpen || isPinned ? "w-64" : "w-16"}`}
                onMouseEnter={() => !isPinned && setIsOpen(true)}
                onMouseLeave={() => !isPinned && setIsOpen(false)}
            >
                <div className="flex items-center justify-between p-2">
                    <button onClick={toggleSidebar} className="p-2 rounded hover:bg-gray-200">
                        <Menu size={20} />
                    </button>

                    <div className={`transition-all duration-300 overflow-hidden ${isOpen || isPinned
                        ? "opacity-100 max-w-10 translate-x-0"
                        : "opacity-0 max-w-0 -translate-x-2"}`}
                    >
                        <button onClick={() => setIsPinned(!isPinned)} className="p-2 rounded cursor-pointer hover:bg-gray-200">
                            {isPinned ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                        </button>
                    </div>
                </div>

                <div className="p-2 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link key={item.path} to={item.path} className={`flex items-center gap-3 p-2 rounded transition-all duration-300 ${isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"}`}>
                                <div className="shrink-0 w-5 h-5">
                                    {item.icon}
                                </div>
                                <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${isOpen || isPinned
                                    ? "opacity-100 translate-x-0 max-w-[200px]"
                                    : "opacity-0 -translate-x-4 max-w-0"}`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            <main className="flex-1 overflow-y-auto">
                <div className="m-6 bg-white rounded-2xl shadow-md p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

