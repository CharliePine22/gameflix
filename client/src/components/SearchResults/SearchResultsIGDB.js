import React, { useState, useEffect } from 'react';
import './SearchResults.css';
import { BsFillArrowUpRightSquareFill } from 'react-icons/bs';
import { MdAddBox } from 'react-icons/md';
import chatterAudio from '../../assets/sounds/murmur.mp3';
import ReactTooltip from 'react-tooltip';
import Typewriter from 'typewriter-effect';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SearchResultsIGDB = ({ searchedGame, setGameDetails }) => {
  const [topGames, setTopGames] = useState([]);
  const [remainderGames, setRemainderGames] = useState([]);
  const [playAudio, setPlayAudio] = useState(false);
  let audio = new Audio(chatterAudio);

  console.log(searchedGame);

  useEffect(() => {
    setTopGames(searchedGame?.slice(0, 3));
    setRemainderGames(searchedGame?.slice(3));
  }, [searchedGame]);

  const playChatterNoise = (e) => {
    audio.play(audio);
  };

  const stopChatterNoise = (e) => {
    audio.pause(audio);
  };

  if (topGames == undefined || remainderGames == undefined) {
    console.log('Loading...');
  }

  return (
    <div className='search_results'>
      <div className='search_results__container'>
        <h2>Top Results</h2>

        {/* Top 3 Search Results */}
        <div className='top_results_row'>
          {topGames == undefined && <Skeleton count={3} />}
          <ReactTooltip
            multiline={true}
            border={true}
            id='adding_tip'
            type='info'
            place='top'
            // afterShow={(e) => playChatterNoise(e)}
            // afterHide={(e) => stopChatterNoise(e)}
          >
            <Typewriter
              options={{
                strings: `Click me to add this game <br> into your personal collection!`,
                autoStart: true,
                delay: 75,
                loop: true,
              }}
            />
          </ReactTooltip>
          {topGames &&
            topGames?.slice(0, 3).map((game) => (
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
                  <div className='result_lower_contents'>
                    <h3 className='game_name'>{game.name}</h3>
                    <ul className='game_theme_list'>
                      {game.themes?.map((theme) => (
                        <li key={theme.id}>{theme.name}</li>
                      ))}
                    </ul>
                  </div>
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
          {remainderGames &&
            remainderGames?.map(
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
                        {game.themes.map((theme) => (
                          <li>{theme.name}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsIGDB;
