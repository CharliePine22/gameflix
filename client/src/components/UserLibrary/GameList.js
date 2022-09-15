import React, { useState } from 'react';
import './GameList.css';
import axios from 'axios';

const GameList = ({ list, exitSearch, setSelectedProfile }) => {
  const searchedGameList = list;
  const [currentGames, setCurrentGames] = useState([]);
  const userEmail = JSON.parse(localStorage.getItem('user')).email;
  const userProfile = JSON.parse(localStorage.getItem('profile')).name;

  const filterOutAdult = (game) => {
    // Grab game tags and game platforms lists
    const gameTags = game.tags;
    const gamePlatforms = game.parent_platforms;

    if (gameTags == null || gamePlatforms == undefined) return false;

    // If the only platform it's available on is PC, flag it for Indie as ost larger games come
    // out on at least 2 systems, It should also be avaialble for Xbox
    if (
      (gamePlatforms.length == 1 && gamePlatforms[0].platform.name == 'PC') ||
      gamePlatforms[0].platform.name == 'Web'
    ) {
      return false;
    }

    // Loop through tag names to look for unwanted tags
    for (let tag of gameTags) {
      if (
        tag.name == 'Nudity' ||
        tag.name == 'Нагота' ||
        tag.name == 'Для взрослых' ||
        tag.name == 'Sexual Content' ||
        tag.name == 'Сексуальный контент' ||
        tag.name == 'Fangame'
      )
        return false;
    }
    return true;
  };

  const addGameHandler = async () => {
    try {
      const request = await axios.post('/app/update_collection', {
        email: userEmail,
        currentProfile: userProfile,
        games: currentGames,
      });
      const currentProfile = request.data.response.profiles.filter((obj) => {
        return obj.name === userProfile;
      });
      setSelectedProfile(currentProfile[0]);
      exitSearch();
    } catch (error) {
      console.log(error);
    }
  };

  const selectGameHandler = (game) => {
    // If the game is currently in the list
    if (currentGames.includes(game.name)) {
      setCurrentGames((games) =>
        games.filter((current) => {
          return current !== game.name;
        })
      );
    } else {
      setCurrentGames((games) => [...games, game.name]);
    }
  };

  return (
    <div className='game_list'>
      <div className='game_list__title'>
        <h2>Search Results</h2>
      </div>
      <div className='game_list__results'>
        <ul className='results_list'>
          {searchedGameList.map(
            (game) =>
              filterOutAdult(game) === true &&
              game.background_image !== null && (
                <li className='results_game_item' key={game.id}>
                  <img
                    className='game_item__image'
                    src={game.background_image}
                  />
                  <p className='game_item__title'>{game.name}</p>
                  <div
                    className={`game_item__add ${
                      currentGames.includes(game.name) && 'added'
                    }`}
                    onClick={() => selectGameHandler(game)}
                  >
                    <span
                      className={`game_item__add_icon ${
                        currentGames.includes(game.name) && 'remove'
                      }`}
                    >
                      {currentGames.includes(game.name) ? '-' : '+'}
                    </span>
                  </div>
                </li>
              )
          )}
        </ul>
      </div>
      <div className='game_list__actions'>
        <button onClick={addGameHandler}>Add</button>
        <button onClick={exitSearch}>Back</button>
      </div>
    </div>
  );
};

export default GameList;
