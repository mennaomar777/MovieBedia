import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TvShows() {
    const [tvShows, setTvShows] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    async function getTvSeries() {
        setIsLoading(true);
        const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/tv/popular',
        params: {language: 'en-US', page: '1'},
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjZmZWZjMTA5ZDE1NjkwMzkyYzg3OWFjMGEyNGY0MCIsIm5iZiI6MTc1MDk1MzY5Ny45OSwic3ViIjoiNjg1ZDZlZTEzZGZhNDY0ZmIyMzRmMTM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Mi_UCZkeuk6IM4Si-dzkJDqh8bRn4VOvDiDx-Poz7bU'
       }
    };

axios
  .request(options)
  .then(res => 
  {
    console.log(res.data.results)
    setTvShows(res.data.results)
    setIsLoading(false)
  }
)
  .catch(err => {
        console.error(err)
        setIsLoading(false)
  });
    }

 
    useEffect(() => {
      getTvSeries()
    }, [])
    
  return (
       <>

{isLoading?<>
<div className='flex justify-center items-center w-full min-h-screen bg-black'>
  <span className="loader"></span>
</div>
</>:
<>
<div className="container mx-auto px-4 mb-10">
  <h2 className='text-3xl text-[#01b4e4] font-bold mt-6 text-center tracking-wide'>Popular TV Shows</h2>

  <div className='flex justify-center items-center mt-3 mb-6'>
    <div className='w-[60px] h-[3px] bg-[#01b4e4]'></div>
    <i className='fa-solid fa-star text-[#01b4e4] px-3 text-xl'></i>
    <div className='w-[60px] h-[3px] bg-[#01b4e4]'></div>
  </div>

  <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
    {
      tvShows?.map((movie) => {
        return (
          <div className='bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-[#01b4e4] transition-all duration-300 group' key={movie.id}> 
            <Link to={`TvSeriesDetails/${movie.id}`}>
              <img 
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                alt={movie.name} 
                className='w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300'
              />
              <div className='p-3'>
                <h3 className='font-semibold text-base text-gray-800 group-hover:text-[#01b4e4] transition-colors duration-300 truncate'>
                  {movie.name}
                </h3>
              </div>
            </Link>

            <div className='flex justify-between items-center px-4 pb-3'>
              <span className='text-gray-500 text-sm'>
                {new Date(movie.first_air_date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>

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
