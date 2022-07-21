import React, { useState, useEffect } from 'react';
import rawgClient from '../../axios';
import requests from '../../requests';
import './Banner.css';

function Banner() {
  const [game, setGame] = useState([]);
  const [gameDetails, setGameDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'c69737aae4e04ce8ad8613ba04c2be9f';
  // State to track time for updating banner
  const [time, setTime] = useState(Date.now());

  // Update banner with random game from list every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 15000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Grab a random game from the list to display as the main banner
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const request = await rawgClient.get(requests[1].url + '&page_size=40');
      setGame(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      setLoading(false);
      return request;
    }
    fetchData();
  }, [time]);

  // Once the random game is selected, fetch the details for the game.
  useEffect(() => {
    async function fetchGameDetails() {
      const request = await rawgClient.get(`games/${game?.id}?key=${API_KEY}`);
      setGameDetails(request.data);
      return request;
    }
    fetchGameDetails();
  }, [game]);

  // If the game description is longer thatn 150 characters, replace the reaminder with the ellipsis '...'
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  if (!game && loading) {
    return 'Loading...';
  } else {
    return (
      <header
        className='banner'
        key={game?.name}
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url(${game?.background_image})`,
          backgroundPosition: 'center center',
        }}
      >
        <div className='banner__contents'>
          <h1 className='banner__title'>{game?.name}</h1>

          <div className='banner__buttons'>
            <button className='banner__button'>See Details</button>
            <button className='banner__button'>Add to My List</button>
          </div>

          <h1 className='banner__description'>
            {truncate(gameDetails.description_raw, 150)}
          </h1>
        </div>

        <div className='banner--fadeBottom' />
      </header>
    );
  }
}

export default Banner;
