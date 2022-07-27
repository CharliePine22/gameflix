import React from 'react';
import GameDetails from '../Row/GameDetails/GameDetails';
import './Game.css';
const Game = ({ game }) => {
  return (
    <div
      className='row__poster_container'
      onClick={() => setDisplayDetails(true)}
    >
      <span className='row__poster_name'>{game.name}</span>
      <img
        className='row__poster'
        src={game.background_image}
        alt={game.name}
      />
      <GameDetails
        game={currentGame}
        displayDetails={displayDetails}
        hideDetails={() => setDisplayDetails(false)}
      />
    </div>
  );
};

export default Game;
