import { useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { GifState } from "../context/gif-context";
import FilterGifs from "../components/filter-gifs";
import { Gif } from "../components/gif";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { gf , filter } = GifState();
  const { query } = useParams();
  const fetchSearchResults = async () =>{
    const {data} = await gf.search(query , {
      sort:"relevant",
      lang:"en",
      limit:20,
    })
    setSearchResults(data);
  }

  useEffect(() => {
    fetchSearchResults();
  } , [query,filter])


  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold">
        {query}
      </h2>

      <FilterGifs alignLeft={true}/>
      
      {
        searchResults.length > 0 ? (
            <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
                    {
                      searchResults.map((gif) => (
                        <Gif gif={gif} key={gif.id} />
                      ))
                    }
                  </div>
        ) : <span>
          {" "}
          No results found for {query}
        </span>
      }
    </div>
  )
}

export default Search;