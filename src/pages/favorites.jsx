import { useState } from 'react';
import { useEffect } from 'react';
import {GifState} from '../context/gif-context';
import Gif from '../components/gif';

const Favorites = () => {
  const [favoritesGIFs, setFavoritesGIFs] = useState([]);
  const { gf, favorites } = GifState();

  const fetchFavoriteGifs = async () => {
    const {data : gifs} = await gf.gifs(favorites);
    setFavoritesGIFs(gifs);
  };

  useEffect(() => {
    fetchFavoriteGifs();
  },[])

  return (
    <div className='mt-3'>
        <span className='faded-text text-3xl'>
          My favorites
        </span>
        <div className='columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-2'>
          {
            favoritesGIFs.map(gif => {
              return <Gif gif={gif} key={gif.id}/>;
            })
          }
        </div>
    </div>
  )
}

export default Favorites