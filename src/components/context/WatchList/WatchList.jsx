import { createContext } from "react";
import axios from 'axios';

export let WatchListContext = createContext('')
export default function WatchListContextProvider({children}){
  async  function addToWatchList(movieId) {
        const options = {
        method: 'POST',
        data:JSON.stringify({
            media_type:"movie",
            media_id:movieId,
            watchlist:true
        }),
        url: 'https://api.themoviedb.org/3/account/22103857/watchlist',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjZmZWZjMTA5ZDE1NjkwMzkyYzg3OWFjMGEyNGY0MCIsIm5iZiI6MTc1MDk1MzY5Ny45OSwic3ViIjoiNjg1ZDZlZTEzZGZhNDY0ZmIyMzRmMTM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Mi_UCZkeuk6IM4Si-dzkJDqh8bRn4VOvDiDx-Poz7bU'
  }
};

return await axios
  .request(options)
  .then(res => res.data)
  .catch(err => err);
    }
    
  async function getWatchList() {
    const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/account/22103857/watchlist/movies',
    params: {language: 'en-US', page: '1', sort_by: 'created_at.asc'},
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjZmZWZjMTA5ZDE1NjkwMzkyYzg3OWFjMGEyNGY0MCIsIm5iZiI6MTc1MDk1MzY5Ny45OSwic3ViIjoiNjg1ZDZlZTEzZGZhNDY0ZmIyMzRmMTM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Mi_UCZkeuk6IM4Si-dzkJDqh8bRn4VOvDiDx-Poz7bU'
    }
  };

return await axios
  .request(options)
  .then(res => res.data)
  .catch(err => err);
  }  
 async  function deleteFromWatchList(movieId) {
        const options = {
        method: 'POST',
        data:JSON.stringify({
            media_type:"movie",
            media_id:movieId,
            watchlist:false
        }),
        url: 'https://api.themoviedb.org/3/account/22103857/watchlist',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YjZmZWZjMTA5ZDE1NjkwMzkyYzg3OWFjMGEyNGY0MCIsIm5iZiI6MTc1MDk1MzY5Ny45OSwic3ViIjoiNjg1ZDZlZTEzZGZhNDY0ZmIyMzRmMTM5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Mi_UCZkeuk6IM4Si-dzkJDqh8bRn4VOvDiDx-Poz7bU'
  }
};

return await axios
  .request(options)
  .then(res => res.data)
  .catch(err => err);
    }


    return <WatchListContext.Provider value={{addToWatchList,getWatchList,deleteFromWatchList}}>
        {children}
    </WatchListContext.Provider>
}
