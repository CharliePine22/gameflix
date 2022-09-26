import React, { useState, useEffect } from 'react';
import './SearchResults.css';
import chatterAudio from '../../assets/sounds/murmur.mp3';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import SkeletonCard from '../SkeletonCard/SkeletonCard';

const SearchResultsIGDB = ({ searchedGame, setGameDetails }) => {
  const [topGames, setTopGames] = useState([]);
  const [remainderGames, setRemainderGames] = useState([]);

  useEffect(() => {
    setTopGames(searchedGame?.slice(0, 3));
    setRemainderGames(searchedGame?.slice(3));
  }, [searchedGame]);

  if (!searchedGame || !topGames || !remainderGames) {
    return <SkeletonCard />;
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
                    backgroundImage: `url(${game.cover?.url})`,
                    backgroundPosition: 'center',
                  }}
                />
                <img
                  src={`//images.igdb.com/igdb/image/upload/t_screenshot_big/${game.screenshots[0]?.image_id}.jpg`}
                />
              </div>
              <div className='top_result_lower'>
                <h3 className='game_name'>
                  {game.name || <Skeleton count={1} />}
                </h3>
                <ul className='game_theme_list'>
                  {game.themes?.map((theme) => (
                    <li key={theme.id}>{theme.name}</li>
                  ))}
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
              game.cover !== undefined &&
              game.themes !== undefined && (
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
                      {game.themes.map(
                        (theme, i) =>
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
