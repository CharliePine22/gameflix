import React, { useState, useEffect } from 'react';
import './Banner.css';
import { BiRefresh } from 'react-icons/bi';
import axios from 'axios';

function Banner({ setGameDetails, twitchToken, addGame, activeProfile }) {
  const [gameList, setGameList] = useState([]);
  const [game, setGame] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const baseURL = process.env.REACT_APP_BASE_URL;
  const exists =
    activeProfile.collection &&
    activeProfile.collection.some((title) => title.id === game?.id);

  // Fetch and return list of games from endpoint
  useEffect(() => {
    if (!twitchToken) return;
    setRefresh(false);
    setIsLoading(true);
    async function fetchData() {
      try {
        const request = await axios.post(`${baseURL}/app/search_game`, {
          token: twitchToken,
          gameName: '',
        });
        const filteredList = await request.data.sort(function (a, b) {
          return b.rating - a.rating;
        });
        setGameList(filteredList);
        setGame(
          filteredList[Math.floor(Math.random() * request.data.length - 1)]
        );
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [refresh, twitchToken]);

  // Return a different game from the games list to highlight
  const getNewGame = () => {
    setGame(gameList[Math.floor(Math.random() * gameList.length - 1)]);
  };

  // If the game description is longer that 150 characters, replace the reaminder with the ellipsis '...'
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  // Wait for game deatils to finish loading or the game name shows up undefined
  // Undefined is a game name apart of the dataset and will display jibberish
  if (isLoading || !game) {
    return (
      <div className='banner__loading'>
        <div className='banner__spinner' />
      </div>
    );
  }

  if (!isLoading && !game) {
    setRefresh(true);
  }
  // console.log(game);

  return (
    <header
      className='banner'
      key={game?.name}
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_1080p_2x/${game.cover?.image_id}.jpg)`,
        backgroundPosition: 'center center',
      }}
    >
      <>
        <div className='banner__contents'>
          <h1 className='banner__title'>{game?.name}</h1>

          <div className='banner__buttons'>
            <button
              className='banner__button'
              onClick={() => setGameDetails(game.id)}
            >
              See Details
            </button>
            {!exists && (
              <button className='banner__button' onClick={() => addGame(game)}>
                Add to My List
              </button>
            )}
          </div>

          <h1 className='banner__description'>
            {truncate(game?.summary, 150)}
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
