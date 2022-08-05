import React, { useState, useEffect } from 'react';
import './SearchResults.css';

const SearchResults = ({ searchedGame }) => {
  const [topGames, setTopGames] = useState([]);
  const [remainderGames, setRemainderGames] = useState([]);

  useEffect(() => {
    setTopGames(searchedGame.slice(0, 3));
    setRemainderGames(searchedGame.slice(3));
  }, [searchedGame]);

  const determinePublisherIcon = (publisher) => {
    switch (publisher) {
      case 'Nintendo':
        return;
    }
  };

  return (
    <div className='search_results'>
      <div className='search_results__container'>
        <h2>Top Results</h2>
        {/* Top 3 Search Results */}
        <div className='top_results_row'>
          {topGames?.slice(0, 3).map((game) => (
            <div className='top_result_container'>
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
          ))}
        </div>
        {/* Remaining Games */}
        <div className='remainder_results'>
          <h2>Results</h2>
          {remainderGames.map((game) => (
            <div className='results_container'>
              <div
                className='results_container_img'
                style={{
                  backgroundSize: 'cover',
                  backgroundImage: `url(${game.background_image})`,
                  backgroundPosition: 'center',
                }}
              />
              <div className='results_container_content'></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
