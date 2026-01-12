import { Bell, Search, User, LogOut, Settings, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Header() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-3">
            <div className="flex items-center justify-between">
                {/* Left Section - Search */}
                <div className="flex items-center flex-1">
                    <div className="relative max-w-md w-full font-semibold text-xl">
                        News App
                    </div>
                </div>

                {/* Right Section - Notifications & Profile */}
                <div className="flex items-center gap-4">
                    {/* Notification Button */}
                    <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                        <Bell size={20} className="text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative" ref={profileRef}>
                        <button
                            // onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                        >
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <User size={18} className="text-white" />
                            </div>
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-medium text-gray-700">Admin User</p>
                                <p className="text-xs text-gray-500">admin@example.com</p>
                            </div>
                            <ChevronDown
                                size={16}
                                className={`text-gray-500 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        {/* Dropdown Menu */}
                        <div
                            className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 transition-all duration-300 origin-top-right ${isProfileOpen
                                    ? "opacity-100 scale-100 translate-y-0"
                                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                                }`}
                        >
                            <a
                                href="#"
                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                            >
                                <User size={16} />
                                Profile
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                            >
                                <Settings size={16} />
                                Settings
                            </a>
                            <hr className="my-1 border-gray-200" />
                            <a
                                href="#"
                                className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-300"
                            >
                                <LogOut size={16} />
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
