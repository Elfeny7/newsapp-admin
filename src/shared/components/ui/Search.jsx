const Search = ({value = "", onChange}) => {
    return (
        <input
            type="text"
            placeholder="Search..."
            value={value}
            onChange={onChange}
            className="rounded-md p-2 w-[200px] ring-1 ring-gray-300 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none focus:border-gray-300 text-sm"
        />
    )
};

export default Search;