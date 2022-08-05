import React, { useState, useEffect } from 'react';
import rawgClient from '../../axios';
import requests from '../../requests';
import './Banner.css';
import useFetchDetails from '../../hooks/useFetchDetails';
import { BiRefresh } from 'react-icons/bi';

function Banner() {
  const [gameList, setGameList] = useState([]);
  const [game, setGame] = useState([]);
  const { isLoading, gameDetails, serverError } = useFetchDetails(game);

  // Fetch and return list of games from endpoint
  useEffect(() => {
    async function fetchData() {
      try {
        const request = await rawgClient.get(requests[2].url + '&page_size=40');
        setGameList(request.data.results);
        setGame(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)
          ]
        );
      } catch (e) {
        console.log(e);
      }
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

  // Wait for game deatils to finish loading or the game name shows up undefined
  // Undefined is a dataset and will display jibberish
  if (isLoading || gameDetails?.name == 'UNDEFINED') {
    return (
      <div className='banner__loading'>
        <div className='banner__spinner' />
      </div>
    );
  }

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
      <>
        <div className='banner__contents'>
          <h1 className='banner__title'>{gameDetails?.name}</h1>

          <div className='banner__buttons'>
            <button
              className='banner__button'
              onClick={() => console.log(gameDetails)}
            >
              See Details
            </button>
            <button className='banner__button'>Add to My List</button>
          </div>

          <h1 className='banner__description'>
            {truncate(gameDetails?.description_raw, 150)}
          </h1>
        </div>
        <div className='banner--fadeBottom' />
      </>

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
