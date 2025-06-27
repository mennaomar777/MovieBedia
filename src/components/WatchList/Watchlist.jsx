import React, { useContext, useEffect,useState } from 'react'
import { WatchListContext } from '../context/WatchList/WatchList'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Watchlist() {
    let {getWatchList,deleteFromWatchList} = useContext(WatchListContext)
    const [watchListMovies, setWatchListMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [moviesAfterDeleting, setMoviesAfterDeleting] = useState([])
    const [deletingId, setDeletingId] = useState(null);

    

    async function getMoviesFromWatchList() {
       try {
        setIsLoading(true)
       let res =  await getWatchList();   
       console.log(res.results);
       setWatchListMovies(res.results)
       } catch (error) {
        console.log(error);
        setIsLoading(true)
       }
       finally{
        setIsLoading(false)

       }
    }

async function removeMovieFromWL(movieId) {
    setDeletingId(movieId)
   let res = await deleteFromWatchList(movieId)
   console.log(res);
   setMoviesAfterDeleting(res)
   if(res.success == true){
    toast.success('Movie is deleted.',{
        position:'top-right'
      })

     let newMovies = watchListMovies.filter((movie)=> movie.id !== movieId)
     setWatchListMovies(newMovies)
     setDeletingId(null);
   }else{
    toast.error('Error, please try again!',{
        position:'top-right'
      })
      setDeletingId(null);
   }
   

    
}
    useEffect(() => {
      getMoviesFromWatchList()    
    }, [])
    
  return (
    <>

{isLoading?<>
<div className='flex justify-center items-center w-full min-h-screen bg-black'>
  <span className="loader"></span>
</div>
</>:<>

<div className="container mb-10">
      <h2 className='text-3xl text-[#01b4e4] font-bold mt-6 text-center tracking-wide'>WatchList Movies</h2>
      <div className='flex justify-center items-center mt-2 mb-4'>
        <div className='w-[50px] h-[3px] bg-[#01b4e4]'></div>
        <i className='fa-solid fa-star text-[#01b4e4] px-2'></i>
        <div className='w-[50px] h-[3px] bg-[#01b4e4]'></div>
      </div>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {
          watchListMovies?.map((movie) => {
            return (
             
              <div className='text-center shadow hover:cursor-pointer rounded-lg hover:shadow-[#01b4e4]  hover:outline-[#01b4e4] transition-all duration-300 group overflow-hidden' key={movie.id}> 
             <Link to={`/movieDetails/${movie.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="" className='rounded-t-lg w-full h-[80%] object-cover group-hover:scale-105 transition-transform duration-300' />
              <h3 className='mt-5 font-semibold text-base text-gray-800 group-hover:text-[#01b4e4] transition-colors duration-300 truncate text-start px-2'>{movie.title}</h3>
             </Link>
             <div className='flex justify-between px-2 items-center'>
               <span className='text-gray-600 text-sm'>{new Date(movie.release_date).toDateString().slice(4)}</span>
               <button className='cursor-pointer hover:scale-110 transition-transform duration-200' onClick={()=>removeMovieFromWL(movie.id)}>
                {deletingId === movie.id ? <i className='fa-solid fa-spinner fa-spin text-red-600 rounded-full p-2 '></i>:<i className='fa-solid fa-trash text-red-600 rounded-full p-2 '></i>}
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
