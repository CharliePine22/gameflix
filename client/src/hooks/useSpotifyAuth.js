import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useSpotifyAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const existingToken = localStorage.getItem('spotify_token');

  useEffect(() => {
    if (!code || existingToken) return;
    const spotifyAuthentication = async () => {
      try {
        const request = await axios.post('/app/spotify_authentication', {
          code,
        });
        setAccessToken(request.data.tokenRequest.body.access_token);
        setRefreshToken(request.data.tokenRequest.body.refresh_token);
        setExpiresIn(request.data.tokenRequest.body.expires_in);
        localStorage.setItem(
          'spotify_token',
          request.data.tokenRequest.body.access_token
        );
        window.history.pushState({}, null, '/');
      } catch (error) {
        console.log('GET TOKEN ERROR');
        window.location = '/';
      }
    };
    spotifyAuthentication();
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const refreshSpotifyToken = async () => {
      try {
        const request = await axios.post('/app/refresh_token', {
          refreshToken,
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