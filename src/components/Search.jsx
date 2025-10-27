const Search = ({value = "", onChange}) => {
    return (
        <input
            type="text"
            placeholder="Search..."
            value={value}
            onChange={onChange}
            className="rounded-lg p-2 w-[200px] bg-gray-200 focus:border-0 focus:ring-1 focus:ring-gray-300 focus:outline-none focus:border-gray-300"
        />
    )
};

export default Search;