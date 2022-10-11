import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useTwitchAuth(id) {
  const [steamCollection, setSteamCollection] = useState([]);
  const baseURL = process.env.REACT_APP_BASE_URL;
  const steamID = sessionStorage.getItem('steamID');

  useEffect(() => {
    if (!id) return;
    const fetchUserLibrary = async () => {
      try {
        const request = await axios.get(`${baseURL}/steam/get_owned_games`, {
          params: {
            id,
            // baseURL,
          },
        });
        sessionStorage.setItem('steamID', request.config.params.id);
        setSteamCollection(request.data);
        window.history.pushState({}, null, '/');
      } catch (error) {
        console.log('GET STEAM COLLECTION ERROR');
      }
    };
    fetchUserLibrary();
  }, [id]);

  useEffect(() => {
    if (steamCollection.length == 0) return;
    const fetchGameStats = async () => {
      try {
        const gameNames = await Promise.all(
          steamCollection.map((game) => {
            // console.log(game);
            return axios.get(`${baseURL}/steam/get_game_stats`, {
              params: { gameId: game.appID },
            });
          })
        );
        console.log(gameNames);
        // const request = await axios.get(`${baseURL}/steam/get_game_stats`, {
        //   params: {
        //     id,
        //     baseURL,
        //   },
        // });
        // setSteamCollection(request.data);
        // window.history.pushState({}, null, '/');
      } catch (error) {
        console.log('GET STEAM COLLECTION ERROR');
      }
    };
    // fetchGameStats();
  }, [steamCollection]);

  return steamCollection;
}
