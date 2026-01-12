import { Search as SearchIcon } from "lucide-react";
const Search = ({ value = "", onChange }) => {
    return (
        <div className="flex items-center flex-1">
            <div className="relative max-w-md w-full">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Search..."
                    value={value}
                    onChange={onChange}
                    // className="rounded-md p-2 w-[200px] ring-1 ring-gray-300 focus:border-0 focus:ring-1 focus:ring-gray-400 focus:outline-none focus:border-gray-300 text-sm"
                    className="pl-10 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
                />
            </div>
        </div>
        // <div className="flex items-center flex-1">
        //     <div className="relative max-w-md w-full">
        //         <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        //         <input
        //             type="text"
        //             placeholder="Search..."
        //             value={value}
        //             onChange={onChange}
        //             className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
        //         />
        //     </div>
        // </div>
    )
};

export default Search;