import { useState, useEffect } from 'react';
import rawgClient from '../axios';

const useFetchDetails = (game) => {
  const API_KEY = 'df0a614ea95743f7a9e2008a796b5249';
  const [isLoading, setIsLoading] = useState(false);
  const [gameDetails, setGameDetails] = useState(null);
  const [serverError, setServerError] = useState(null);

  // Fetch a new game
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const resp = await rawgClient.get(`games/${game?.id}?key=${API_KEY}`);
        const data = await resp?.data;
        setGameDetails(data);
        setIsLoading(false);
      } catch (error) {
        setServerError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [game]);
  return { isLoading, gameDetails, serverError };
};

export default useFetchDetails;
