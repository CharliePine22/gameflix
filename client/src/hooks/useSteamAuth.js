import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useSteamAuth(id) {
  const [steamCollection, setSteamCollection] = useState([]);
  const baseURL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    if (!id) return;
    const fetchUserLibrary = async () => {
      try {
        const request = await axios.get(`${baseURL}/steam/get_owned_games`, {
          params: {
            id,
          },
        });
        localStorage.setItem('steamID', request.config.params.id);
        console.log(request.data);
        setSteamCollection(request.data);
        window.history.pushState({}, null, '/');
      } catch (error) {
        console.log(error);
        console.log('GET STEAM COLLECTION ERROR');
      }
    };
    fetchUserLibrary();
  }, [id]);

  return steamCollection;
}
