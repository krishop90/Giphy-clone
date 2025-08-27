import { useEffect } from "react";
import { GifState } from "../context/gif-context";
import Gif from "../components/gif";
import FilterGifs from "../components/filter-gifs";

const Home = () => {

  const { gf , gifs , setGifs , filter} = GifState();

  const fetchTrendingGifs = async () =>{
    const {data} = await gf.trending({
      limit:20,
      type: filter,
      rating: "g",
    });
    setGifs(data);
  }

  useEffect(() => {
    fetchTrendingGifs();
  }, []);

  return (
    <div>
      <img src="/banner.gif" alt="banner" className="mt-2 rounded w-full"/>

      <FilterGifs showTrending/>

      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
        {
          gifs.map((gifs) => {
            return <Gif gif={gifs} key={gifs.title} />
          })
        }
      </div>
    </div>
  )
}

export default Home