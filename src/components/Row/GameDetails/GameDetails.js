import React, { useState, useEffect } from 'react';
import './GameDetails.css';
import rawgClient from '../../../axios';
import youtubeAPI from '../../../youtubeAPI';

const GameDetails = () => {
  const [gameDetails, setGameDetails] = useState([]);
  // const fetchGameDetails = async (id) => {
  //   const request = await rawgClient.get(`games/${id}`);
  //   console.log(request.data);
  // };

  // fetchGameDetails(id);

  useEffect(() => {
    const fetchGameTrailer = async () => {
      const request = await youtubeAPI.get('/search', {
        params: {
          q: 'test',
        },
      });

      console.log(request);
    };
    fetchGameTrailer();
  }, []);

  return (
    <div className='game-details'>
      <div className='game-details__trailer'></div>
      <div className='game-details__details'></div>
    </div>
  );
};

export default GameDetails;
