import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default function TvSeriesDetails() {
  let { id } = useParams();
  const [tvSeriesDetails, setTvSeriesDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  

  async function getTvSeriesDetails() {
    setIsLoading(true)
const options = {
  method: 'GET',
  url: `https://api.themoviedb.org/3/tv/${id}`,
  params: {language: 'en-US'},
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjZmZWZjMTA5ZDE1NjkwMzkyYzg3OWFjMGEyNGY0MCIsIm5iZiI6MTc1MDk1MzY5Ny45OSwic3ViIjoiNjg1ZDZlZTEzZGZhNDY0ZmIyMzRmMTM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Mi_UCZkeuk6IM4Si-dzkJDqh8bRn4VOvDiDx-Poz7bU'
  }
};

axios
  .request(options)
  .then(res => {
    console.log(res.data)
    setTvSeriesDetails(res.data)
    setIsLoading(false)
  })
  .catch(err => {
    console.error(err)
    setIsLoading(false)
});
  }

  useEffect(() => {
    getTvSeriesDetails();
  }, []);

  return (
    <>
    {isLoading?<>
    <div className='flex justify-center items-center w-full min-h-screen'>
  <span className="loader"></span>
</div>
</>: <>
      {tvSeriesDetails.backdrop_path && (
        <div
          className="relative w-full min-h-screen bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${tvSeriesDetails.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-black/70"></div>

          <div className="relative z-10 container mx-auto px-4 py-10">
            <div className="flex flex-col lg:flex-row items-start gap-6">
              <div className="w-full lg:w-1/3 flex justify-center">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${tvSeriesDetails.poster_path}`}
                  alt=""
                  className="w-[70%] md:w-[60%] lg:w-full rounded-lg object-cover shadow-xl"
                />
              </div>

              <div className="w-full lg:w-2/3 text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">
                  {tvSeriesDetails.name}
                </h2>

                <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
                  <span>{tvSeriesDetails.first_air_date}</span>
                  {tvSeriesDetails.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-gray-900 border border-gray-700 py-1 px-3 rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Overview</h3>
                  <p className="text-gray-200">{tvSeriesDetails.overview}</p>
                </div>

                {tvSeriesDetails.production_companies?.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Production Companies
                    </h3>
                    <ul className="flex flex-wrap gap-4">
                      {tvSeriesDetails.production_companies
                        .filter((c) => c.logo_path)
                        .map((company) => (
                          <li
                            key={company.id}
                            className="w-24 h-12 bg-white flex items-center justify-center rounded shadow p-1"
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/w500/${company.logo_path}`}
                              alt={company.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}</>}

    </>
  );
}
