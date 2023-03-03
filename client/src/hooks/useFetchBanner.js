import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchBanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bannerGamesList, setBannerGamesList] = useState([]);
  const [currentGame, setCurrentGame] = useState('');
  const [serverError, setServerError] = useState(null);
  const twitchToken = localStorage.getItem('twitch_auth');
  const baseURL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    if (!twitchToken || bannerGamesList.length > 0) return;
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
        setBannerGamesList(filteredList);
        setCurrentGame(
          filteredList[Math.floor(Math.random() * request.data.length - 1)]
        );
        setIsLoading(false);
      } catch (error) {
        setServerError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [twitchToken]);

  const displayNewBanner = () => {
    setCurrentGame(
      bannerGamesList[Math.floor(Math.random() * bannerGamesList.length - 1)]
    );
  };

  return { isLoading, serverError, currentGame, displayNewBanner };
};

export default useFetchBanner;
