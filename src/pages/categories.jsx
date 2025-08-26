import { useParams } from "react-router-dom"
import { useState , useEffect } from "react";
import { GifState } from "../context/gif-context";
import { Gif } from "../components/gif";


const Category = () => {
  const [result , setResult] = useState([]);  
  const {category} = useParams();
  const {gf} = GifState();
  const fetchResults = async () =>{
    const {data} = await gf.gifs(category , category)
    setResult(data);
  }
  
    useEffect(() => {
      fetchResults();
    } , [category])

  return (
    <div className="flex flex-col sm:flex-row gap-5 my-4">
       <div className="w-full sm:w-72">
          {result.length > 0 && <Gif gif={result[0]} hover={false}/>}
          <span className="text-gray-400 text-sm pt-2">
            Don&apos,t tell it to me, GIF to me!
          </span>
       </div>
       
       <div>
        <h2 className="text-4xl text-gray-100 pb-3 font-bold">
          {category ? category.split("-").join("&") : ""}
        </h2>

        <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer">
          @{category}
        </h2>
        
        {
        result.length > 0 ? (
            <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
                    {
                      result.slice(1).map((gif) => (
                        <Gif gif={gif} key={gif.id} />
                      ))
                    }
                  </div>
        ) : <span>
          {" "}
          No results found for {category}
        </span>
      }
       </div>
    </div>
  )
}

export default Category;