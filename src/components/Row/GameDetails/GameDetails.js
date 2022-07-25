import React, { useState, useEffect } from 'react';
import './GameDetails.css';
import requests from '../../../requests';
import rawgClient from '../../../axios';

const GameDetails = ({ id }) => {
  const [gameDetails, setGameDetails] = useState([]);

  useEffect(() => {
    const fetchGameDetails = async (id) => {
      const request = await rawgClient.get(`games/${id}`);
      console.log(request.data);
    };

    fetchGameDetails(id);
  }, [id]);

  return (
    <div className='game-details'>
      <div className='game-details__trailer'></div>
      <div className='game-details__details'></div>
    </div>
  );
};

export default GameDetails;
