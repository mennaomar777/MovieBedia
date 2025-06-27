import { Children, useState } from 'react'
import {createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Home from "./components/Home/Home"
import './App.css'
import MovieDetails from './components/MovieDetails/MovieDetails'
import WatchListContextProvider from './components/context/WatchList/WatchList'
import { Toaster } from "react-hot-toast";
import Watchlist from './components/WatchList/Watchlist'
import TvShows from './components/TvShows/TvShows'
import TvSeriesDetails from './components/TvSeriesDetails/TvSeriesDetails'
import NotFound from './components/NotFound/NotFound'


function App() {
let router = createBrowserRouter([
  {path:'',element:<Layout/>,children:[
     {index:true,element:<Home/>},
     {path:'MovieDetails/:id',element:<MovieDetails/>},
     {path:'Watchlist',element:<Watchlist/>},
     {path:'TvShows',element:<TvShows/>},
     {path:'TvShows/TvSeriesDetails/:id',element:<TvSeriesDetails/>},
     {path:'*',element:<NotFound/>},


  ]}
])
  return (
 <>
<WatchListContextProvider>
   <RouterProvider router={router}>
   </RouterProvider>
   <Toaster/>
</WatchListContextProvider>
 </>
  )
}

export default App
