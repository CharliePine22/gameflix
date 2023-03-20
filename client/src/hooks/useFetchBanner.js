import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchBanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bannerGamesList, setBannerGamesList] = useState([]);
  const [currentGame, setCurrentGame] = useState('');
  const [currentGameTrailer, setCurrentGameTrailer] = useState('');
  const [serverError, setServerError] = useState(null);
  const twitchToken = localStorage.getItem('twitch_auth');
  const baseURL = process.env.REACT_APP_BASE_URL;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const request = await axios.post(`${baseURL}/app/search_game`, {
        token: twitchToken,
        gameName: '',
      });
      const filteredList = await request.data.sort(function (a, b) {
        return b.rating - a.rating;
      });
      const selectedGame =
        filteredList[Math.floor(Math.random() * request.data.length - 1)];
      setBannerGamesList(filteredList);
      setCurrentGame(selectedGame);
      let trailer = selectedGame.videos.find((video) =>
        video.name.includes('Trailer')
      );
      setCurrentGameTrailer(
        `https://www.youtube.com/watch?v=${trailer.video_id}`
      );

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setServerError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!twitchToken || bannerGamesList.length > 0) return;

    fetchData();
  }, [twitchToken]);

  useEffect(() => {
    if (!serverError) return;
    fetchData();
  }, [serverError]);

  const displayNewBanner = () => {
    const newGame =
      bannerGamesList[Math.floor(Math.random() * bannerGamesList.length - 1)];
    const newGameTrailer = newGame.videos.find((video) =>
      video.name.includes('Trailer')
    );
    setCurrentGame(newGame);
    setCurrentGameTrailer(
      `https://www.youtube.com/watch?v=${newGameTrailer.video_id}`
    );
    return;
  };

  return {
    isLoading,
    serverError,
    currentGame,
    currentGameTrailer,
    displayNewBanner,
  };
};

export default useFetchBanner;
