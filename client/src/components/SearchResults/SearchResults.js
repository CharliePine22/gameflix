import React, { useState, useEffect } from 'react';
import './SearchResults.css';
import { BsFillArrowUpRightSquareFill } from 'react-icons/bs';
import { IoAddCircleOutline } from 'react-icons/io5';
import { MdAddBox } from 'react-icons/md';
import chatterAudio from '../../assets/sounds/murmur.mp3';
import ReactTooltip from 'react-tooltip';
import Typewriter from 'typewriter-effect';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SearchResults = ({ searchedGame, setGameDetails }) => {
  const [topGames, setTopGames] = useState([]);
  const [remainderGames, setRemainderGames] = useState([]);
  const [playAudio, setPlayAudio] = useState(false);
  let audio = new Audio(chatterAudio);
  // searchedGame.sort((a, b) =>
  //   a.total_rating > b.total_rating
  //     ? 1
  //     : b.total_rating > a.total_rating
  //     ? -1
  //     : 0
  // );

  console.log(searchedGame);
  // console.log(topGames);

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
  // Filter out any games with adult content/themes or smaller indie games
  const filterOutAdult = (game) => {
    // Grab game tags and game platforms lists
    const gameTags = game.tags;
    const gamePlatforms = game.parent_platforms;

    if (gameTags == null || gamePlatforms == null) return false;

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
  }

  return (
    <div className='search_results'>
      <div className='search_results__container'>
        <h2>Top Results</h2>
        <ReactTooltip
          multiline={true}
          border={true}
          id='details_tip'
          type='info'
          place='top'
          // afterShow={(e) => playChatterNoise(e)}
          // afterHide={(e) => stopChatterNoise(e)}
        >
          <Typewriter
            options={{
              strings: `Click me to see more details <br> about this game!`,
              autoStart: true,
              delay: 75,
              loop: true,
            }}
          />
        </ReactTooltip>

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
            topGames?.slice(0, 3).map(
              (game) =>
                filterOutAdult(game) == true && (
                  <div className='top_result_container' key={game.name}>
                    <div className='top_result_upper'>
                      <div
                        className='result_publisher'
                        style={{
                          backgroundSize: 'cover',
                          backgroundImage: `url(${game.short_screenshots[1].image})`,
                          backgroundPosition: 'center',
                        }}
                      />
                      <img src={game.background_image} />
                      <MdAddBox
                        className='top_result_add_icon'
                        data-tip
                        data-for='adding_tip'
                      />
                      <BsFillArrowUpRightSquareFill
                        onClick={() => setGameDetails(game)}
                        className='top_result_details_icon'
                        data-tip
                        data-for='details_tip'
                      />
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
                    <MdAddBox
                      className='result_add_icon'
                      data-tip
                      data-for='adding_tip'
                    />
                    <BsFillArrowUpRightSquareFill
                      onClick={() => setGameDetails(game)}
                      className='result_details_icon'
                      data-tip
                      data-for='details_tip'
                    />
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
