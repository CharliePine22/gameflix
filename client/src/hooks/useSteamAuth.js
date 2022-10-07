import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useTwitchAuth(id) {
  const [steamCollection, setSteamCollection] = useState([]);
  const baseURL = process.env.REACT_APP_BASE_URL;
  console.log(id);

  useEffect(() => {
    if (!id) return;
    const fetchUserLibrary = async () => {
      try {
        const request = await axios.get(`${baseURL}/steam/get_owned_games`, {
          params: {
            id,
            baseURL,
          },
        });
        console.log(request);
        // window.history.pushState({}, null, '/');
      } catch (error) {
        console.log('GET STEAM COLLECTION ERROR');
      }
    };
    fetchUserLibrary();
  }, [id]);

  return steamCollection;
}
