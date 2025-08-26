import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './layout/app-layout'
import Home from './pages/home'
import Category from './pages/categories'
import Favorites from './pages/favorites'
import Search from './pages/search'
import SingleGif from './pages/single-gif'
import GifProvider from './context/gif-context'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children:[
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/:category',
        element: <Category />
      },
      {
        path: '/favorites',
        element: <Favorites />
      },
      {
        path: '/search/:query',
        element: <Search />
      },
      {
        path: '/:type/:slug',
        element: <SingleGif />
      }
    ]
  }
])

function App() {
  return (
    <GifProvider>
      <RouterProvider router={router} />
    </GifProvider>
  )
}

export default App
