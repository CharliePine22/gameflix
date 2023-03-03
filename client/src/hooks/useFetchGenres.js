import { useState, useEffect } from 'react';
import axios from 'axios';
import requestsIGDB from '../requestsIGDB';

export default function useFetchGenres() {
  const existingToken = localStorage.getItem('twitch_auth');
  const [genreGamesList, setGenreGamesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const baseURL = process.env.REACT_APP_BASE_URL;
  const currentDate = new Date();

  useEffect(() => {
    const fetchGenres = async () => {
      const request = await axios.get(`${baseURL}/app/get_genres`);
      const last_updated = new Date(request.data.last_updated);

      if (currentDate > last_updated.setDate(last_updated.getDate() + 1)) {
        return updateGenresAPI();
      } else {
        setGenreGamesList(request.data[0].genres_list);
        setIsLoading(false);
        return request.data;
      }
    };

    const updateGenresAPI = async () => {
      if (!existingToken) return;

      const genreTitles = await Promise.all(
        requestsIGDB.map((genre) => {
          return axios.post(`${baseURL}/app/game_genre`, {
            token: existingToken,
            genreId: genre.genreId,
            genreTitle: genre.title,
          });
        })
      );
      const completeGenreList = genreTitles.map((genre) => genre.data);
      updateGenresCollection(completeGenreList);
      setIsLoading(false);
    };

    fetchGenres();
  }, [existingToken]);

  const updateGenresCollection = async (list) => {
    const request = await axios.post(`${baseURL}/app/update_genres`, {
      genreList: list,
      date: currentDate,
    });
    setGenreGamesList(request.data.genres_list);
  };

  return { genreGamesList, isLoading };
}
