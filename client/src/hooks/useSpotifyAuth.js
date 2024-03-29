import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useSpotifyAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const baseURL = process.env.REACT_APP_SPOTIFY_REDIRECT;
  const prevToken = sessionStorage.getItem('spotify_auth');

  useEffect(() => {
    if (prevToken) {
      setAccessToken(JSON.parse(prevToken));
      return;
    }
    if (!code) return;
    const spotifyAuthentication = async () => {
      try {
        console.log(code);
        const request = await axios.post(
          `${baseURL}/app/spotify_authentication`,
          {
            code,
            baseURL,
          }
        );
        console.log(request);
        setAccessToken(request.data.tokenRequest.body.access_token);
        setRefreshToken(request.data.tokenRequest.body.refresh_token);
        setExpiresIn(request.data.tokenRequest.body.expires_in);
        sessionStorage.setItem(
          'spotify_auth',
          JSON.stringify(request.data.tokenRequest.body.access_token)
        );
        window.history.pushState({}, '', '/');
      } catch (error) {
        localStorage.setItem('error', error);
        window.location = '/';
      }
    };
    spotifyAuthentication();
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const refreshSpotifyToken = async () => {
      try {
        const request = await axios.post(`${baseURL}/app/refresh_token`, {
          refreshToken,
          baseURL,
        });
        setAccessToken(request.data.body.body.access_token);
        setRefreshToken(request.data.body.body.refresh_token);
        setExpiresIn(request.data.body.body.expires_in);
      } catch (error) {
        console.log('REFRESH TOKEN ERROR');
        window.location = '/';
      }
    };
    const interval = setInterval(() => {
      refreshSpotifyToken();
    }, (expiresIn - 60) * 1000);

    return () => clearTimeout(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
