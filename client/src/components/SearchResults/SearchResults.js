import React, { useState, useEffect } from 'react';
import './SearchResults.css';

const SearchResults = ({ searchedGame }) => {
  const [topGames, setTopGames] = useState([]);
  const [remainderGames, setRemainderGames] = useState([]);

  useEffect(() => {
    setTopGames(searchedGame?.slice(0, 3));
    setRemainderGames(searchedGame?.slice(3));
  }, [searchedGame]);

  const determinePublisherIcon = (publisher) => {
    switch (publisher) {
      case 'Nintendo':
        return;
    }
  };

  // Filter out any games with adult content/themes or smaller indie games
  const filterOutAdult = (game) => {
    // Grab game tags and game platforms lists
    const gameTags = game.tags;
    const gamePlatforms = game.parent_platforms;

    if (gameTags == null) return false;

    // If the only platform it's available on is PC, flag it for Indie as ost larger games come
    // out on at least 2 systems, It should also be avaialble for Xbox
    if (gamePlatforms.length == 1 && gamePlatforms[0].platform.name == 'PC') {
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

  if (topGames == undefined || remainderGames == undefined) {
    console.log('Loading...');
  } else {
    console.log('DONE');
  }

  return (
    <div className='search_results'>
      <div className='search_results__container'>
        <h2>Top Results</h2>
        {/* Top 3 Search Results */}
        <div className='top_results_row'>
          {topGames &&
            topGames?.slice(0, 3).map(
              (game) =>
                filterOutAdult(game) == true && (
                  <div className='top_result_container' key={game.name}>
                    <div className='top_result_upper'>
                      <div
                        className='result_publisher'
                        style={{
                          backgroundSize: 'cover',
                          backgroundImage: `url(${game.background_image})`,
                          backgroundPosition: 'center',
                        }}
                      />
                      <img src={game.background_image} />
                    </div>
                    <div className='top_result_lower'>
                      <div className='result_lower_contents'>
                        <h3 className='game_name'>{game.name}</h3>
                      </div>
                    </div>
                    <div
                      className='game_cover'
                      style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${game.background_image})`,
                        backgroundPosition: 'center',
                      }}
                    />
                  </div>
                )
            )}
        </div>
        {/* Remaining Games */}
        <div className='remainder_results'>
          <h2>Results</h2>
          {remainderGames &&
            remainderGames?.map(
              (game) =>
                filterOutAdult(game) == true &&
                game.background_image !== null && (
                  <div className='results_container' key={game.name}>
                    <div
                      className='results_container_img'
                      style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${game.background_image})`,
                        backgroundPosition: 'center',
                      }}
                    />
                    <div className='results_container_content'>
                      <h3 className='game_name_remainder'>{game.name}</h3>
                      {/* <p>{game.publisher}</p> */}
                      <p className='game_playtime'>
                        Playtime: {game.playtime}hrs
                      </p>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
