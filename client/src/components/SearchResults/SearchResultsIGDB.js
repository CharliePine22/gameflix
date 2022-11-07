import React, { useState, useEffect, useRef } from 'react';
import './SearchResults.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SkeletonCard from '../SkeletonCard/SkeletonCard';

const SearchResultsIGDB = ({ searchedGame, setGameDetails }) => {
  const [topGames, setTopGames] = useState([]);
  const [remainderGames, setRemainderGames] = useState([]);

  console.log(searchedGame);

  useEffect(() => {
    setTopGames(searchedGame?.slice(0, 3));
    setRemainderGames(searchedGame?.slice(3));
  }, [searchedGame]);

  // Skeleton Loader
  if (!searchedGame || !topGames || !remainderGames) {
    return (
      <div className='search_results'>
        <div className='search_results__container_skeleton'>
          <div className='top_results_row_skeleton'>
            <h2>Top Results</h2>
            <SkeletonCard count={3} type='full' />
          </div>
          <div className='remainder_results_skeleton'>
            <h2>Results</h2>
            <SkeletonCard count={9} />
          </div>
        </div>
      </div>
    );
  }

  if (searchedGame.length == 0) {
    return (
      <div className='search_results__error'>
        <p>
          Sorry, no results for current game, please refine your search and try
          again!
        </p>
      </div>
    );
  }

  return (
    <div className='search_results'>
      <div className='search_results__container'>
        <h2>Top Results</h2>

        {/* Top 3 Search Results */}
        <div className='top_results_row'>
          {topGames?.map((game) => (
            <div
              className='top_result_container'
              key={game.id}
              onClick={() => setGameDetails(game)}
            >
              <div className='top_result_upper'>
                <div
                  className='result_publisher'
                  style={{
                    backgroundSize: 'cover',
                    backgroundImage: `url(${game.screenshots[0]?.url})`,
                    backgroundPosition: 'center',
                  }}
                />
                <img
                  src={`//images.igdb.com/igdb/image/upload/t_screenshot_big/${
                    game.artworks
                      ? game.artworks[0]?.image_id
                      : game.cover?.image_id
                  }.jpg`}
                />
              </div>
              <div className='top_result_lower'>
                <h3 className='game_name'>
                  {game.name || <Skeleton count={1} />}
                </h3>
                <ul className='game_theme_list'>
                  {game.themes?.map(
                    (theme) =>
                      theme.name !== 'Sandbox' && (
                        <li key={theme.id}>{theme.name}</li>
                      )
                  )}
                </ul>
              </div>
              <div
                className='game_cover'
                style={{
                  backgroundSize: 'cover',
                  backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_cover_big/${game.cover?.image_id}.jpg)`,
                  backgroundPosition: 'center',
                }}
              />
            </div>
          ))}
        </div>
        {/* Remaining Games */}
        <div className='remainder_results'>
          <h2>Results</h2>
          {remainderGames?.map(
            (game) =>
              game.cover !== undefined && (
                <div
                  className='results_container'
                  key={game.id}
                  onClick={() => setGameDetails(game)}
                >
                  <div
                    className='results_container_img'
                    style={{
                      backgroundSize: 'cover',
                      backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg)`,
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className='results_container_content'>
                    <h3 className='game_name_remainder'>{game.name}</h3>
                    {/* <p>{game.publisher}</p> */}
                    <ul className='game_theme_list_lower'>
                      {game.themes?.map(
                        (theme, i) =>
                          theme.name !== 'Sandbox' &&
                          i < 3 && <li key={theme.id}>{theme.name}</li>
                      )}
                    </ul>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      <div className='search_bottom_fade' />
    </div>
  );
};

export default SearchResultsIGDB;
