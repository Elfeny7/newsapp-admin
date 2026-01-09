const Button = ({
    children,
    loading = false,
    disabled = false,
    closeButton = false,
    className = "",
    ...props
}) => {
    return (
        <button
            disabled={loading || disabled}
            className={`relative ${closeButton ? "bg-gray-200 text-gray-700" : "bg-blue-500 text-white"} px-4 py-2 rounded-lg flex items-center justify-center transition-all 
        ${disabled ? "opacity-70 cursor-not-allowed" : closeButton ? "hover:bg-gray-300 cursor-pointer" : "hover:bg-blue-700 cursor-pointer"} 
        ${className}`}
            {...props}
        >
            {loading && (
                <div className="absolute animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
            )}
            <span className={`${loading ? "invisible" : "visible"}`}>{children}</span>
        </button>
    );
};

export default Button;