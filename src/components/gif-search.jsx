import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";

export const GifSearch = () => {
    const [query , setQuery] = useState("");
    const navigate = useNavigate();

    const searchGIFs = async () =>{
        if(query.trim() === ""){
            return;
        }

        navigate(`/search/${query}`)
    }

    return (
        <div className="flex relative mt-3">
            <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search GIFs and Stickers"
                className="w-full pl-4 pr-14 py-5 text-xl text-black rounded-tl rounded-bl border border-gray-300 outline-none bg-white" 
            />

            {
                query &&
                <button
                    onClick={() => setQuery("")}
                    className="absolute bg-gray-300 opacity-90 rounded-full right-20 mr-2 top-6 cursor-pointer"
                >
                    <MdOutlineClose size={22}/>
                </button>
            }
            
            <button
                onClick={searchGIFs}
                className="bg-gradient-to-tr from-pink-600 to-pink-400 text-white px-4 py-2 rounded-tr rounded-br"
            >
                <HiSearch size={35} className="-scale-x-100"/>
            </button>

        </div>
      )
}

export default GifSearch;