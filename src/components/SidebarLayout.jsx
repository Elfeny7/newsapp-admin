import { useState } from "react";
import { Menu, Circle, CircleOff, House, Users, LayoutGrid, Newspaper } from "lucide-react";
import { Outlet, Link, useLocation } from "react-router-dom";

export default function SidebarLayout() {
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
    ];

    return (
        <div className="flex h-screen bg-gray-200">
            <div className={`relative transition-all duration-300 ease-in-out bg-white shadow-lg ${isOpen || isPinned ? "w-64" : "w-16"}`}
                onMouseEnter={() => !isPinned && setIsOpen(true)}
                onMouseLeave={() => !isPinned && setIsOpen(false)}
            >
                <div className="flex items-center justify-between p-2">
                    <button onClick={toggleSidebar} className="p-2 rounded hover:bg-gray-200">
                        <Menu size={20} />
                    </button>

                    {isOpen || isPinned ? (
                        <button onClick={() => setIsPinned(!isPinned)} className="p-2 rounded cursor-pointer hover:bg-gray-200">
                            {isPinned ? <CircleOff size={20} /> : <Circle size={20} />}
                        </button>
                    ) : null}
                </div>
                <div className="p-2 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-2 p-2 rounded transition-all duration-300 ${isActive ? "bg-blue-100 text-blue-700 font-medium" : "hover:bg-gray-100"}`}
                            >
                                {item.icon}
                                {(isOpen || isPinned) && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </div>
            </div>
            <main className="flex-1 transition-all duration-300">
                <div className="m-6 bg-white rounded-2xl shadow-md">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
