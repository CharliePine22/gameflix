import React, { useState, useEffect } from 'react';
import './GameDetails.css';
import youtubeAPI from '../../../youtubeAPI';
import playstationLogo from '../../../assets/images/playstation-logo.png';
import nintendoLogo from '../../../assets/images/nintendo-logo.png';
import xboxLogo from '../../../assets/images/xbox-logo.png';
import steamLogo from '../../../assets/images/steam-logo.png';
import iosLogo from '../../../assets/images/apple-logo.png';
import androidLogo from '../../../assets/images/android-logo.png';
import useFetchDetails from '../../../hooks/useFetchDetails';
import { AxiosError } from 'axios';

const GameDetails = ({ game, videoId, hideDetails }) => {
  const { isLoading, gameDetails, serverError } = useFetchDetails(game);

  // Convert name of platforms into pulisher icon
  const displayConsoleIcons = (platform) => {
    switch (platform) {
      case 'PC':
        return <img src={steamLogo} alt='PC' className='platform_logo' />;
      case 'PlayStation':
        return (
          <img
            src={playstationLogo}
            alt='Playstation'
            className='platform_logo'
          />
        );
      case 'Nintendo':
        return (
          <img src={nintendoLogo} alt='Nintendo' className='platform_logo' />
        );
      case 'Xbox':
        return <img src={xboxLogo} alt='Xbox' className='platform_logo' />;
      case 'iOS':
        return <img src={iosLogo} alt='iOS' className='platform_logo' />;
      case 'Android':
        return (
          <img src={androidLogo} alt='Android' className='platform_logo' />
        );
    }
  };

  const goToGameWebsite = (url) => {
    window.open(url, '_blank');
  };

  useEffect(() => {
    console.log(gameDetails);
  }, [gameDetails]);

  // Convert the YYYY-MM-DD to Month, Day, Year
  const convertDate = (date) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let now = new Date(date);
    let currentDay = now.getDate();
    let formattedDay;

    // Give the numbered day the appropriate abbriviation
    switch (currentDay) {
      case 1:
      case 21:
      case 31:
        formattedDay = currentDay + 'st';
        break;
      case 2:
      case 22:
        formattedDay = currentDay + 'nd';
        break;
      case 3:
      case 23:
        formattedDay = currentDay + 'rd';
        break;
      default:
        formattedDay = currentDay + 'th';
        break;
    }
    return (
      months[now.getMonth()] + ' ' + formattedDay + ', ' + now.getFullYear()
    );
  };
  // onMouseLeave={hideDetails}
  return (
    <div className='game-details'>
      <div className='game-details__trailer'>
        {videoId !== null ? (
          <iframe className='trailer' />
        ) : (
          <img
            className='trailer_placeholder'
            src={gameDetails?.background_image}
          />
        )}
      </div>
      <div className='game-details__container'>
        <div className='game-details__details'>
          <h3
            className='game-details__name'
            // onClick={goToGameWebsite(gameDetails?.website)}
          >
            {gameDetails?.name}
          </h3>
          <p className='game-details__released'>
            Release Date: {convertDate(gameDetails?.released)}
          </p>
          <p className='game-details__released'>
            Metacritic: {gameDetails?.metacritic}%
          </p>
          <ul className='game-details__platforms'>
            {gameDetails?.parent_platforms.map(
              (platform) =>
                platform.platform.name !== 'Apple Macintosh' &&
                platform.platform.name !== 'Linux' && (
                  <li
                    key={platform.platform.name}
                    className='game-details__platform'
                  >
                    {displayConsoleIcons(platform.platform.name)}
                  </li>
                )
            )}
          </ul>
        </div>
        <div className='game-details__tags'>
          <ul className='game-details__tags_list'>
            {gameDetails?.tags.slice(0, 3).map((tag, i) => (
              <li className='game-details__tag' key={tag.name}>
                {i == 0 ? (
                  <span className={'tag_no_border'}>{tag.name}</span>
                ) : (
                  <span className={'tag_border'}>{tag.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
