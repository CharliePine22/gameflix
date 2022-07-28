import React, { useState, useEffect } from 'react';
import rawgClient from '../../axios';
import requests from '../../requests';
import Loading from '../LoadingAnimation/Loading';
import './Banner.css';
import useFetchDetails from '../../hooks/useFetchDetails';
import { BiRefresh } from 'react-icons/bi';

function Banner() {
  const [game, setGame] = useState([]);
  const { isLoading, gameDetails, serverError } = useFetchDetails(game);

  // State to track time for updating banner
  const [time, setTime] = useState(Date.now());

  // Update banner with random game from list every 15 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => setTime(Date.now()), 10000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  // Grab a random game from the list to display as the main banner
  useEffect(() => {
    async function fetchData() {
      const request = await rawgClient.get(requests[2].url + '&page_size=40');
      setGame(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  // If the game description is longer that 150 characters, replace the reaminder with the ellipsis '...'
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <header
      className='banner'
      key={gameDetails?.name}
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(${gameDetails?.background_image})`,
        backgroundPosition: 'center center',
      }}
    >
      {(gameDetails == null || isLoading) && <Loading />}
      <div className='banner__contents'>
        <h1 className='banner__title'>{gameDetails?.name}</h1>

        <div className='banner__buttons'>
          <button className='banner__button'>See Details</button>
          <button className='banner__button'>Add to My List</button>
        </div>

        <h1 className='banner__description'>
          {truncate(gameDetails?.description_raw, 150)}
        </h1>
      </div>
      <div className='banner--fadeBottom' />
      {<BiRefresh size={35} className='banner__refresh_icon' />}
    </header>
  );
}

export default Banner;
