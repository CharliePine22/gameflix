import React from 'react';
import './GameList.css';

const GameList = ({ list, exitSearch }) => {
  const searchedGameList = list;

  const filterOutAdult = (game) => {
    // Grab game tags and game platforms lists
    const gameTags = game.tags;
    const gamePlatforms = game.parent_platforms;
    if (gameTags == null || gamePlatforms == undefined) return false;

    // If the only platform it's available on is PC, flag it for Indie as ost larger games come
    // out on at least 2 systems, It should also be avaialble for Xbox
    if (gamePlatforms.length == 1 && gamePlatforms[0].platform.name == 'PC') {
      console.log(game.name);
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
                <li className='results_game_item'>
                  <img
                    className='game_item__image'
                    src={game.background_image}
                  />
                  <p className='game_item__title'>{game.name}</p>
                </li>
              )
          )}
        </ul>
      </div>
      <div className='game_list__actions'>
        <button>Add Multiple</button>
        <button onClick={exitSearch}>Back</button>
      </div>
    </div>
  );
};

export default GameList;
