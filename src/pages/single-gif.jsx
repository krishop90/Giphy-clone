import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { GifState } from "../context/gif-context";
import Gif from "../components/gif";
import {HiMiniChevronDown , HiMiniChevronUp} from "react-icons/hi2";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane , FaHeart , FaCode} from "react-icons/fa";

const contentType = ['gifs' , 'stickers' , 'text'];

const SingleGif = () => {
  const {type , slug} = useParams();
  const [gif , setGif] = useState({});
  const [relatedGifs , setRelatedGifs] = useState([]);
  const [readmore , setReadmore] = useState(false);

  const {gf , addToFavorites , favorites} = GifState(); 

  const shareGif = () => {
    navigator.clipboard.writeText(gif.url);
    alert("GIF URL copied to clipboard!");
  };

  const embedGif = () => {
    const embedCode = `<iframe src="${gif.embed_url}" width="480" height="360" frameborder="0" allowfullscreen></iframe>`;
    navigator.clipboard.writeText(embedCode);
    alert("GIF embed code copied to clipboard!");
  };

  const fetchGif = async () => {
    try {
      const GifID = slug.split("-").pop(); 
      const { data } = await gf.gif(GifID);
      const { data: related } = await gf.related(GifID, { limit: 10 });

      setGif(data);
      setRelatedGifs(related);
    } catch (err) {
      console.error("Error fetching gif:", err);
    }
  };


  useEffect(() => {
    if(!contentType.includes(type)){
       throw new Error('Invalid content type');
    }

    fetchGif();
  },[])

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {gif?.user && (
          <> 
            <div className="flex gap-1">
              <img 
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
            <div className="px-2">
              <div className="font-bold">
                {gif?.user?.display_name}
              </div>
              <div className="faded-text">
                @{gif?.user?.username}
              </div>
            </div>
            </div>
            {gif?.user?.description && (
            <div className="py-4 text-sm text-gray-400">
              <p className="whitespace-pre-line">
                {readmore
                  ? gif?.user?.description
                  : gif?.user?.description.slice(0, 30) + (gif?.user?.description.length > 30 ? "..." : "")
                }
              </p>

              <button
                className="flex items-center gap-1 text-blue-400 hover:underline mt-2"
                onClick={() => setReadmore(!readmore)}
              >
                {readmore ? (
                  <>
                    Read Less <HiMiniChevronUp size={18} />
                  </>
                ) : (
                  <>
                    Read More <HiMiniChevronDown size={18} />
                  </>
                )}
              </button>
            </div>
)}
          {
            gif?.source && (
              <div>
                <span className="faded-text">
                  Source
                </span>
                <div className="flex items-center text-sm font-bold gap-1">
                  <HiOutlineExternalLink size={25}/>
                  <a href={gif.source} target="_blank" className="truncate">{gif.source}
                    {gif.source}
                  </a>
                </div>
              </div>
            )
          }
          </>
        )}
      </div>

      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">
              {gif.title}
              <Gif gif={gif} hover={false}/>

              <div className="flex sm:hidden gap-1">
                <div className="flex gap-1">
                <img 
                  src={gif?.user?.avatar_url}
                  alt={gif?.user?.display_name}
                  className="h-14"
                />
                <div className="px-2">
                  <div className="font-bold">
                    {gif?.user?.display_name}
                  </div>
                  <div className="faded-text">
                    @{gif?.user?.username}
                  </div>
                </div>
                <button 
                  className="ml-auto" 
                  // onClick={shareGif}
                >
                  <FaPaperPlane size={25}/>
                </button>
                </div>
              </div>

            </div>
          <div>
            <span className="font-extrabold">
              Related Gifs
            </span>
            <div className="columns-3 md:columns gap-2">
              {
                relatedGifs.slice(1).map((gif) => (
                  <Gif key={gif.id} gif={gif} />
                ))
              }
            </div>
          </div>
          </div>
          <div className="hidden sm:flex flex-col gap-5 mt-6">
              <button 
                onClick={ () => {addToFavorites(gif.id)}}
                className="flex gap-5 items-center font-bold text-lg">
                <FaHeart 
                  size={30}
                  className = {`${favorites.includes(gif.id) ? "text-pink-500" : ""} `}
                />
                Favorite
              </button>
              <button
                onClick={shareGif}
                className="flex gap-6 items-center font-bold text-lg"
              >
                <FaPaperPlane size={30} />
                Share
              </button>
              <button
                onClick={embedGif}
                className="flex gap-5 items-center font-bold text-lg"
              >
                <FaCode size={30} />
                Embed
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleGif