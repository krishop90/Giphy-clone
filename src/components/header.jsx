import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { HiOutlineDotsVertical , HiOutlineMenuAlt3 } from 'react-icons/hi';
import { GifState } from '../context/gif-context';
import GifSearch from './gif-search';

const Header = () => {
    const [categories , setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);

    const {gf , favorites } = GifState();

    const fetchGifCategories = async () => {
        const {data} = await gf.categories();
        setCategories(data);
    }

    useEffect(() => {
        fetchGifCategories();
    } ,[])

    return <nav>
        <div className='relative flex gap-4 justify-between items-center'>
            <Link to="/" className='flex gap-2'>
                <img src="/logo.svg" className='w-8' alt="Logo" />
                <h1 className='text-5xl font-bold tracking-tight cursor-pointer'>GIPHY</h1>
            </Link>
        <div className='font-bold text-md flex gap-2 items-center'>
            {categories?.slice(0,5)?.map((category) => {
                return (
                    <Link key={category.name}
                             to={`/${category.name}`} 
                            className="px-4 py-1 text-xl border-b-4 hidden lg:block hover:bg-gradient-to-r hover:from-teal-600 hover:via-blue-600 hover:to-purple-600">
                            {category.name}
                    </Link>
                )
            })}
            
            <button onClick={() => setShowCategories(!showCategories)}>
                <HiOutlineDotsVertical 
                    size={35}
                    className={`py-0.5 border-b-4 hidden ${ showCategories ? "hover:bg-gradient-to-r hover:from-teal-600 hover:via-blue-600 hover:to-purple-600" : ""} lg:block `}
                />
            </button>

            {
                favorites.length > 0 &&
                <div className='h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded'>
                    <Link to="/favorites"> Favorites GIFs</Link>
                </div>
            }

            <button>
                <HiOutlineMenuAlt3 className='text-sky-400 block lg:hidden' size={30}/>
            </button>
        </div>
            {showCategories && 
                <div className='absolute right -0 top-14 px-10 pt-6 pb-9 w-full bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 z-20'>
                    <span className='text-3xl font-extrabold'>
                        Categories
                    </span>
                    <hr className='bg-gray-100 opacity-50 my-5'/>
                    <div className='grid grid-cols-2 sm:grid-cols-3 md-grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
                        {
                            categories?.map((category) => {
                                return <Link 
                                            key={category.name}
                                            to={`/${category.name}`}
                                            className='font-bold'>
                                    {category.name}
                                </Link>
                            })
                        }
                        
                    </div>
                </div>
            }
        </div>

        <GifSearch />
    </nav>
}

export default Header