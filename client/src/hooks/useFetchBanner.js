import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchBanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bannerGamesList, setBannerGamesList] = useState([]);
  const [currentGame, setCurrentGame] = useState('');
  const [serverError, setServerError] = useState(null);
  const twitchToken = localStorage.getItem('twitch_auth');
  const baseURL = process.env.REACT_APP_BASE_URL;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const request = await axios.post(`${baseURL}/app/fetch_banner_list`, {
        token: twitchToken,
      });

      const selectedGame =
        request.data[Math.floor(Math.random() * request.data.length - 1)];
      setBannerGamesList(request.data);
      setCurrentGame(selectedGame);
      setIsLoading(false);
      return currentGame;
    } catch (error) {
      console.log(error);
      setServerError(error);
      setIsLoading(false);
      return;
    }
  };

  useEffect(() => {
    if (!twitchToken || bannerGamesList.length > 0) return;

    fetchData();
  }, [twitchToken]);

  const displayNewBanner = () => {
    const newGame =
      bannerGamesList[Math.floor(Math.random() * bannerGamesList.length - 1)];
    setCurrentGame(newGame);
    return newGame;
  };

  return {
    isLoading,
    serverError,
    currentGame,
    displayNewBanner,
  };
};

export default useFetchBanner;
