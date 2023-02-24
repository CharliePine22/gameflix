import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetchPopular() {
  const existingToken = localStorage.getItem('twitch_auth');
  const [bannerGamesList, setBannerGamesList] = useState([]);
  const baseURL = process.env.REACT_APP_BASE_URL;
  const currentDate = new Date();

  useEffect(() => {
    const fetchPopularGames = async () => {
      const request = await axios.get(`${baseURL}/authentication/login_banner`);
      const last_updated = new Date(request.data.last_updated);

      // If a week has passed since the last update, run a new update
      if (currentDate > last_updated.setDate(last_updated.getDate() + 7)) {
        return updatePopularGamesAPI();
      } else {
        return setBannerGamesList(request.data.popular_games_list);
      }
    };
    fetchPopularGames();

    const updatePopularGamesAPI = async () => {
      if (!existingToken) return;
      try {
        const request = await axios.post(`${baseURL}/app/popular_titles`, {
          token: existingToken,
        });
        return updateCollection(request.data);
      } catch (err) {
        console.log(err);
        return err;
      }
    };
  }, [existingToken]);

  const updateCollection = async (list) => {
    const request = await axios.post(
      `${baseURL}/authentication/update_login_banner`,
      {
        gameList: list,
        date: new Date(),
      }
    );

    setBannerGamesList(request.data.popular_games_list);
  };

  return bannerGamesList;
}
