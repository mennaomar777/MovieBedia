import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { WatchListContext } from '../context/WatchList/WatchList';
import toast from 'react-hot-toast';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  let {addToWatchList, deleteFromWatchList, getWatchList } = useContext(WatchListContext)
  const [heartIsLoading, setHeartIsLoading] = useState(null)
  const [watchlistIds, setWatchlistIds] = useState([]);
  


  async function getUpcomingMovies() {
    setIsLoading(true)
   const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/upcoming',
    params: {language: 'en-US', page: '1'},
    headers: {
     accept: 'application/json',
     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjZmZWZjMTA5ZDE1NjkwMzkyYzg3OWFjMGEyNGY0MCIsIm5iZiI6MTc1MDk1MzY5Ny45OSwic3ViIjoiNjg1ZDZlZTEzZGZhNDY0ZmIyMzRmMTM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Mi_UCZkeuk6IM4Si-dzkJDqh8bRn4VOvDiDx-Poz7bU'
    }
};

await axios
  .request(options)
  .then(res =>{
     console.log(res.data.results)
     setMovies(res.data.results)
     setSearchMovies(res.data.results)
     setIsLoading(false)
  }
  
    )
  .catch(err => {
    console.error(err)
    setIsLoading(false)
  })

  }

function getSearchMovies(value){
  if(value == ''){
    setSearchMovies(movies)
  }else {
    let newmovies = structuredClone(movies)
    let filteredMovies = newmovies.filter((mov) => {
     return mov.title.toLowerCase().includes(value.toLowerCase())
    })
    setSearchMovies(filteredMovies)
  }

}

async function addToWList(id) {
  setHeartIsLoading(id)
    let res = await addToWatchList(id)
    console.log(res);
    if(res.success == true){
      toast.success('Movie is added to watchlist.',{
        position:'top-right'
      })
        setHeartIsLoading(null)
    }
    else{
            toast.error('Movie is not added.',{
            position:'top-right'
      })
        setHeartIsLoading(null)

    }
    
  
}

async function getUserWatchlist() {
  try {
    const res = await getWatchList();
    const ids = res.results.map((movie) => movie.id);
    setWatchlistIds(ids);
  } catch (err) {
    console.error(err);
  }
}

async function toggleWatchlist(id) {
  setHeartIsLoading(id);

  if (watchlistIds.includes(id)) {
    const res = await deleteFromWatchList(id);
    if (res.success) {
      toast.success('Removed from watchlist.');
      setWatchlistIds(prev => prev.filter(movieId => movieId !== id));
    } else {
      toast.error('Failed to remove movie.');
    }
  } else {
    const res = await addToWatchList(id);
    if (res.success) {
      toast.success('Added to watchlist.');
      setWatchlistIds(prev => [...prev, id]);
    } else {
      toast.error('Failed to add movie.');
    }
  }

  setHeartIsLoading(null);
}

  useEffect(() => {
    getUpcomingMovies();
    getUserWatchlist();
  }, [])
  
  return (
    <>

{isLoading?<>
<div className='flex justify-center items-center w-full min-h-screen bg-black'>
  <span className="loader"></span>
</div>
</>:<>
<form className="max-w-md mx-auto mt-4">   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input onInput={(e) => getSearchMovies(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-[#01b4e4] rounded-lg bg-gray-50 focus:ring-[#01b4e4] focus:border-[#01b4e4] focus:outline-[#01b4e4] focus:shadow-[#01b4e4] " placeholder="Search Upcoming Movies..." required />
    </div>
</form>

<div className="container mb-10">
      <h2 className='text-3xl text-[#01b4e4] font-bold mt-6 text-center tracking-wide'>Upcoming Movies</h2>
      <div className='flex justify-center items-center mt-2 mb-4'>
        <div className='w-[50px] h-[3px] bg-[#01b4e4]'></div>
        <i className='fa-solid fa-star text-[#01b4e4] px-2'></i>
        <div className='w-[50px] h-[3px] bg-[#01b4e4]'></div>
      </div>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {
          searchMovies?.map((movie) => {
            return (
              <div className='text-center shadow hover:cursor-pointer rounded-lg hover:shadow-[#01b4e4]  hover:outline-[#01b4e4] transition-all duration-300 group overflow-hidden' key={movie.id}> 
             <Link to={`movieDetails/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" className='rounded-t-lg w-full h-[80%] object-cover group-hover:scale-105 transition-transform duration-300' />
              <h3 className='font-semibold text-base text-gray-800 group-hover:text-[#01b4e4] transition-colors duration-300 truncate mt-4 text-start px-2'>{movie.title}</h3>
             </Link>
             <div className='flex justify-between px-2'>
               <span className='text-gray-600 text-sm'>{new Date(movie.release_date).toDateString().slice(4)}</span>
            <button className='cursor-pointer' onClick={() => toggleWatchlist(movie.id)}>
  {
    heartIsLoading === movie.id ? (
      <i className="fa-solid fa-spinner fa-spin text-red-600 rounded-full p-2"></i>
    ) : (
      watchlistIds.includes(movie.id) ? (
        <i className="fa-solid fa-heart text-red-600 bg-white rounded-full p-2"></i>
      ) : (
        <i className="fa-regular fa-heart text-red-600 bg-white rounded-full p-2"></i>
      )
    )
  }
</button>

             </div>
              </div>
             
            )
          })
        }
      </div>
</div>
</>}

    </>
  )
}
