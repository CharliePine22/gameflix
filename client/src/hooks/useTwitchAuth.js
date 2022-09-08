import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useTwitchAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [tokenType, setTokenType] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    const fetchTwitchToken = async () => {
      const request = await axios.post(
        `https://id.twitch.tv/oauth2/token?client_id=${process.env.REACT_APP_IGDB_CLIENT_ID}&client_secret=${process.env.REACT_APP_IGDB_CLIENT_SECRET}&grant_type=client_credentials`
      );
      setAccessToken(request.data.access_token);
      setTokenType(request.data.refresh_token);
      setExpiresIn(request.data.expires_in);
    };
    fetchTwitchToken();
  }, [code]);

  return accessToken;
}
