import { useState, useEffect } from 'react';
import rawgClient from '../axios';

const useFetchDetails = (game) => {
  const [isLoading, setIsLoading] = useState(false);
  const [gameDetails, setGameDetails] = useState(null);
  const [serverError, setServerError] = useState(null);

  // Fetch a new game
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const resp = await rawgClient.get(
          `games/${game?.id}?key=${process.env.REACT_APP_RAWG_API_KEY}`
        );
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
