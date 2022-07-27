import React, { useState, useEffect } from 'react';
import rawgClient from '../../axios';
import GameDetails from './GameDetails/GameDetails';
import './Row.css';
import youtubeAPI from '../../youtubeAPI';

function Row({ title, fetchURL }) {
  const [games, setGames] = useState([]);
  const [currentGame, setCurrentGame] = useState('');
  const [displayDetails, setDisplayDetails] = useState(false);
  const [currentlyOpen, setCurrentlyOpen] = useState(null);

  useEffect(() => {
    // Grab games from each genre
    async function fetchData() {
      const request = await rawgClient.get(fetchURL);
      setGames(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  // Grab trailer video from selected game
  const fetchGameDetails = (game) => {
    setCurrentlyOpen(game.name);
    setCurrentGame(game);
  };

  const closeGameDetails = () => {
    setCurrentlyOpen(null);
    setCurrentGame(null);
  };

  return (
    <div className={`row ${currentlyOpen && 'hide-row'}`} key={title}>
      <h2>{title}</h2>
      <div className='row__posters'>
        {games.map(
          (game) =>
            game.background_image !== null && (
              <React.Fragment key={game.name}>
                <div
                  className={`row__poster_container ${
                    currentlyOpen && 'poster_hidden'
                  }`}
                  // onMouseEnter={() => fetchGameDetails(game)}
                  // onMouseLeave={() => closeGameDetails()}
                  onClick={() => fetchGameDetails(game)}
                >
                  <span className='row__poster_name'>{game?.name}</span>
                  <img
                    className='row__poster'
                    src={game.background_image}
                    alt={game.name}
                  />
                  {currentlyOpen === game.name && (
                    <GameDetails
                      game={currentGame}
                      displayDetails={displayDetails}
                      hideDetails={closeGameDetails}
                    />
                  )}
                </div>
              </React.Fragment>
            )
        )}
      </div>
    </div>
  );
}

export default Row;
