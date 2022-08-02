import React, { useState, useEffect } from 'react';
import rawgClient from '../../axios';
import requests from '../../requests';
import Loading from '../LoadingAnimation/Loading';
import './Banner.css';
import useFetchDetails from '../../hooks/useFetchDetails';
import { BiRefresh } from 'react-icons/bi';

function Banner() {
  const [gameList, setGameList] = useState([]);
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

  // Fetch and return list of games from endpoint
  useEffect(() => {
    async function fetchData() {
      const request = await rawgClient.get(requests[2].url + '&page_size=40');
      setGameList(request.data.results);
      setGame(gameList[Math.floor(Math.random() * gameList.length - 1)]);
      return request;
    }
    fetchData();
  }, []);

  // Return a different game from the games list to highlight
  const getNewGame = () => {
    setGame(gameList[Math.floor(Math.random() * gameList.length - 1)]);
  };

  // If the game description is longer that 150 characters, replace the reaminder with the ellipsis '...'
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  if (!gameDetails) {
    return 'Loading...';
  }

  console.log(gameDetails);

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
      {
        <BiRefresh
          size={35}
          className='banner__refresh_icon'
          onClick={() => getNewGame()}
        />
      }
    </header>
  );
}

export default Banner;
