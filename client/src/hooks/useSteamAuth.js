import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useSteamAuth(code) {
  const [spotifyId, setSpotifyId] = useState('');
  const baseURL = process.env.REACT_APP_BASE_URL;

  // useEffect(() => {
  //   if (!code) return;
  //   const fetchSteamId = async () => {
  //     try {
  //       const request = await axios.get(`${baseURL}/steam/get_id`);
  //       setSpotifyId(request.data);
  //     } catch (error) {
  //       console.log('GET TOKEN ERROR');
  //       window.location = '/';
  //     }
  //   };
  //   fetchSteamId();
  // }, [code]);

  return spotifyId;
}
