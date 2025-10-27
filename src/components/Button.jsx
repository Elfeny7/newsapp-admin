const Button = ({
    children,
    loading = false,
    disabled = false,
    className = "",
    ...props
}) => {
    return (
        <button
            disabled={loading || disabled}
            className={`relative bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center transition-all 
        ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700 cursor-pointer"} 
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