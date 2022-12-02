import React, { useEffect, useState } from 'react';
import './GameDetails.css';
import youtube from '../../youtubeAPI';
import ReactPlayer from 'react-player/lazy';
import axios from 'axios';
// ESRB Logos
import eRating from '../../assets/images/ESRB_E.png';
import tRating from '../../assets/images/ESRB_T.png';
import mRating from '../../assets/images/ESRB_M.png';
import rpRating from '../../assets/images/ESRB_RP.png';
// Game Platform Logo Images
import playstationLogo from '../../assets/images/playstation-logo.png';
import pspLogo from '../../assets/images/psp-logo.png';
import psVitaLogo from '../../assets/images/psvita-logo.png';
import nesLogo from '../../assets/images/nes-logo.png';
import nintendoLogo from '../../assets/images/nintendo-logo.png';
import nintendoDs from '../../assets/images/nintendo-ds.png';
import nintendo3ds from '../../assets/images/nintendo-3ds.png';
import gbaLogo from '../../assets/images/gba-logo.png';
import wiiLogo from '../../assets/images/wii-logo.png';
import wiiULogo from '../../assets/images/wiiu-logo.png';
import xboxLogo from '../../assets/images/xbox-logo.png';
import steamLogo from '../../assets/images/steam-logo.png';
import iosLogo from '../../assets/images/apple-logo.png';
import androidLogo from '../../assets/images/android-logo.png';
import segaLogo from '../../assets/images/sega-logo.png';
import snesLogo from '../../assets/images/snes-logo.png';
import gamecubeLogo from '../../assets/images/gamecube-logo.png';
// Modules
import Carousel, { CarouselItem } from './Carousel';
import { VscLibrary } from 'react-icons/vsc';

// ('https://www.youtube.com/watch?v=${GAMEVIDEOID}');

const GameDetails = ({
  game,
  closeDetails,
  addGame,
  removeGame,
  activeProfile,
  twitchToken,
}) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const [gameDetails, setGameDetails] = useState({});
  const [gameTrailer, setGameTrailer] = useState('');
  const [loading, setLoading] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeScreenshot, setActiveScreenshot] = useState('');
  const [error, setError] = useState('');
  const currentCollection = activeProfile.collection;
  const exists =
    currentCollection &&
    currentCollection.some((game) => game.id === gameDetails.id);

  const searchGameDetails = async () => {
    try {
      const request = await axios.post(`${baseURL}/app/search_game_details`, {
        token: twitchToken,
        gameId: game.id,
      });

      const result = await request.data;
      if (game.name !== result[0].name)
        setError(
          `Sorry ${activeProfile.name} but our princess is in another castle! Please try again!`
        );
      if (!result[0].status < 400) {
        setGameDetails(result[0]);
        if (result[0].videos) setGameTrailer(result[0]?.videos[0]?.video_id);
      } else {
        setError(
          `Sorry ${activeProfile.name} but our princess is in another castle! Please try again!`
        );
      }
    } catch (error) {
      setError(
        `Sorry ${activeProfile.name} but our princess is in another castle! Please try again!`
      );
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!game) return;
    searchGameDetails(game);
    setActiveScreenshot('');
  }, [game]);

  useEffect(() => {
    const fetchYoutubeTrailer = async () => {
      try {
        const trailerRequest = await youtube.youtubeAPI.get('/search', {
          params: {
            q: game.name + ' Trailer',
          },
        });
        // https://www.youtube.com/watch?v=NmNn5jfoUH0

        // setDetails((previousDetails) => ({
        //   ...previousDetails,
        //   trailer: trailerRequest.data.items[0],
        // }));
      } catch (error) {
        if (error.response.status !== 200) {
          console.log('No youtube issue');
          return null;
        }
      }
    };
    // fetchYoutubeTrailer();
  }, []);

  const toggleFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const shortenDescription = (description) => {
    if (description.summary == undefined) return 'No available description';
    if (description.storyline) {
      const cleanGame = description.storyline.replace(/<[^>]*>?/gm, '');
      const cleanedGame = cleanGame.replace(/&#39;/g, "'").trim();

      if (cleanedGame.length > 300 && showFullDescription == false) {
        return cleanedGame.split('').slice(0, 300).join('') + '...';
      } else {
        return cleanedGame;
      }
    } else {
      const cleanGame = description.summary.replace(/<[^>]*>?/gm, '');
      const cleanedGame = cleanGame.replace(/&#39;/g, "'").trim();

      if (cleanedGame.length > 300 && showFullDescription == false) {
        return cleanedGame.split('').slice(0, 300).join('') + '...';
      } else {
        return cleanedGame;
      }
    }
  };

  const addGameHandler = async () => {
    await addGame(gameDetails);
  };

  const removeGameHandler = async () => {
    await removeGame(game);
  };

  // Convert name of platforms into a PNG icon
  const displayConsoleIcons = (platform) => {
    switch (platform) {
      case 'PC (Microsoft Windows)':
      case 'PC':
        return <img src={steamLogo} alt='PC' className='game_platform_logo' />;
      case 'PlayStation':
      case 'PS1':
      case 'PlayStation 2':
      case 'PS2':
      case 'PlayStation 3':
      case 'PS3':
      case 'PlayStation 4':
      case 'PS4':
      case 'PlayStation 5':
      case 'PS5':
        return (
          <img
            src={playstationLogo}
            alt={platform}
            className='game_platform_logo'
          />
        );
      case 'PlayStation Portable':
      case 'PSP':
        return (
          <img src={pspLogo} alt={platform} className='game_platform_logo' />
        );
      case 'Vita':
        return (
          <img src={psVitaLogo} alt={platform} className='game_platform_logo' />
        );
      case 'Nintendo 64':
      case 'N64':
      case 'Nintendo 64DD':
      case 'Nintendo Switch':
      case 'Switch':
        return (
          <img
            src={nintendoLogo}
            alt={platform}
            className='game_platform_logo'
          />
        );
      case 'Nintendo DS':
      case 'NDS':
        return (
          <img src={nintendoDs} alt={platform} className='game_platform_logo' />
        );
      case 'GBA':
        return (
          <img src={gbaLogo} alt={platform} className='game_platform_logo' />
        );
      case 'Nintendo 3DS':
      case 'New Nintendo 3DS':
      case '3DS':
        return (
          <img
            src={nintendo3ds}
            alt={platform}
            className='game_platform_logo'
          />
        );
      case 'Nintendo GameCube':
      case 'NGC':
        return (
          <img
            src={gamecubeLogo}
            alt={platform}
            className='game_platform_logo'
          />
        );
      case 'Wii':
        return (
          <img src={wiiLogo} alt={platform} className='game_platform_logo' />
        );
      case 'Wii U':
      case 'WiiU':
        return (
          <img src={wiiULogo} alt={platform} className='game_platform_logo' />
        );
      case 'SNES':
        return (
          <img src={snesLogo} alt={platform} className='game_platform_logo' />
        );
      case 'NES':
        return (
          <img src={nesLogo} alt={platform} className='game_platform_logo' />
        );
      case 'Xbox':
      case 'XBOX':
      case 'XONE':
      case 'Xbox One':
      case 'Xbox 360':
      case 'X360':
      case 'Series X':
        return (
          <img src={xboxLogo} alt={platform} className='game_platform_logo' />
        );
      case 'iOS':
      case 'Mac':
        return (
          <img src={iosLogo} alt={platform} className='game_platform_logo' />
        );
      case 'Android':
      case 'Linux':
        return (
          <img
            src={androidLogo}
            alt={platform}
            className='game_platform_logo'
          />
        );
      case 'SEGA':
      case 'Dreamcast':
        return (
          <img src={segaLogo} alt={platform} className='game_platform_logo' />
        );
    }
  };

  if (error !== '') {
    return (
      <p className='game_details__error'>
        {error}{' '}
        <span
          style={{ fontSize: '1.8rem', marginTop: '20px', padding: '5px 32px' }}
          className='snes_button'
          onClick={closeDetails}
        >
          Back
        </span>
      </p>
    );
  }

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
    let now = new Date(date?.replace(/-/g, '/'));
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
      // Most days have the th ending (28th) so set as default
      default:
        formattedDay = currentDay + 'th';
        break;
    }
    return (
      months[now.getMonth()] + ' ' + formattedDay + ', ' + now.getFullYear()
    );
  };

  // Return a ESRB rating picture according to fetched game
  const determineESRB = (game) => {
    if (gameDetails == null || gameDetails.age_ratings == null) {
      return <img className='game_details__esrb_img' src={rpRating} />;
    }
    const esrb = gameDetails?.age_ratings[0].rating;

    switch (esrb) {
      case 1:
      case 2:
      case 8:
      case 9:
        return <img className='game_details__esrb_img' src={eRating} />;
      case 3:
      case 4:
      case 10:
        return <img className='game_details__esrb_img' src={tRating} />;
      case 5:
      case 11:
        return <img className='game_details__esrb_img' src={mRating} />;
      default:
        return <img className='game_details__esrb_img' src={rpRating} />;
    }
  };

  if (Object.keys(gameDetails).length == 0 || loading) {
    return (
      <div className='game_details__wrapper' data-title='.dot-falling'>
        <div className='stage'>
          <div className='dot-falling'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='game_details__wrapper'>
      <img
        className='game_details__background'
        src={`//images.igdb.com/igdb/image/upload/t_1080p_2x/${gameDetails.cover?.image_id}.jpg`}
      />
      <div className='game_details__container'>
        <h2>{gameDetails.name}</h2>
        <div className='game_details__details'>
          <div className='game_details__media'>
            <div className='media_placeholder'>
              <VscLibrary className='game_details__swap_icon' />
              <img
                className='details_img'
                src={
                  activeScreenshot == ''
                    ? `//images.igdb.com/igdb/image/upload/t_cover_big_2x/${gameDetails?.cover?.image_id}.jpg`
                    : activeScreenshot
                }
              />
              <div className='game_details__screenshots'>
                <img
                  src={`//images.igdb.com/igdb/image/upload/t_cover_big_2x/${gameDetails.cover?.image_id}.jpg`}
                  className='screenshot_thumbnail'
                  onClick={() =>
                    setActiveScreenshot(
                      `//images.igdb.com/igdb/image/upload/t_cover_big_2x/${gameDetails.cover?.image_id}.jpg`
                    )
                  }
                  style={{
                    border:
                      gameDetails.cover.image_id == activeScreenshot
                        ? '1px solid lightblue'
                        : '1px solid transparent',
                  }}
                />
                {/* SCREENSHOTS */}
                {gameDetails.screenshots?.map((screenshot) => (
                  <img
                    key={screenshot.id}
                    style={{
                      border:
                        screenshot.image == activeScreenshot
                          ? '1px solid lightblue'
                          : '1px solid transparent',
                    }}
                    src={`//images.igdb.com/igdb/image/upload/t_screenshot_big_2x/${screenshot.image_id}.jpg`}
                    onClick={() =>
                      setActiveScreenshot(
                        `//images.igdb.com/igdb/image/upload/t_screenshot_big_2x/${screenshot.image_id}.jpg`
                      )
                    }
                    className='screenshot_thumbnail'
                  />
                ))}

                {/* ARTWORKS */}
                {gameDetails.artworks?.map((screenshot) => (
                  <img
                    key={screenshot.id}
                    style={{
                      border:
                        screenshot.image == activeScreenshot
                          ? '1px solid lightblue'
                          : '1px solid transparent',
                      objectFit: 'fill',
                    }}
                    src={`//images.igdb.com/igdb/image/upload/t_screenshot_big_2x/${screenshot.image_id}.jpg`}
                    onClick={() =>
                      setActiveScreenshot(
                        `//images.igdb.com/igdb/image/upload/t_screenshot_big_2x/${screenshot.image_id}.jpg`
                      )
                    }
                    className='screenshot_thumbnail'
                  />
                ))}
              </div>
            </div>

            {/* GAME INFORMATION */}
            <div className='game_details__info_container_top'>
              <div className='game_details__data'>
                {/* PUBLISHERS */}
                <div className='game_details__publishers'>
                  <h4 className='game_details__title'>Publishers</h4>
                  <ul className='publishers_list'>
                    {gameDetails.involved_companies?.map((company) => (
                      <li key={company.id} className='publisher'>
                        {company.company.name}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* PLATFORMS */}
                <div className='game_details__platforms'>
                  <h4 className='game_details__title'>Platforms</h4>
                  <ul className='platforms_list'>
                    {gameDetails.platforms?.map((platform, i) => {
                      if (platform.category == 1 || platform.category == 5) {
                        if (
                          platform.name !== 'Super Famicom' &&
                          platform.name !== 'Family Computer' &&
                          platform.name !== 'Nintendo DSi' &&
                          platform.name !== 'Family Computer Disk System'
                        ) {
                          return (
                            <li
                              key={platform.id}
                              className='platform'
                              alt='platform'
                            >
                              {displayConsoleIcons(
                                platform.abbreviation || platform.name
                              )}
                              <p>{platform.abbreviation || platform.name}</p>
                            </li>
                          );
                        }
                      }
                    })}
                  </ul>
                </div>
                {gameDetails.rating && (
                  <div className='game_details__rating'>
                    <h4 className='game_details__title'>Rating</h4>
                    <p>{Math.round(gameDetails.rating) + '%'}</p>
                  </div>
                )}
                <div className='game_details__released'>
                  <h4 className='game_details__title'>Release Date</h4>
                  <p>{convertDate(gameDetails?.release_dates[0]?.human)}</p>
                </div>
                <div className='game_details__esrb'>
                  <h4 className='game_details__title'>ESRB</h4>
                  {determineESRB(gameDetails)}
                </div>
              </div>
            </div>
            {/* SIMILAR GAMES  */}
            {/* <div className='media_soundtrack__container'>
              <Carousel>
                {gameDetails.similar_games?.map((game) => (
                  <CarouselItem
                    imageUrl={`//images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover.image_id}.jpg`}
                    key={game.id}
                    width='100%'
                  >
                    <div
                      className='similar_game__container'
                      onClick={() => searchGameDetails(game.id)}
                      // onClick={() => console.log(game)}
                    >
                      <div className='similar_game__details'>
                        <p className='similar_game__company'>
                          <i>{game.involved_companies?.at(-1).company.name}</i>
                        </p>
                        <ul className='similar_game__genres'>
                          {gameDetails.genres?.map((genre) => (
                            <li
                              key={genre.name}
                              style={{ fontSize: '1.15rem' }}
                            >
                              {genre.name.split('(')[0]}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </Carousel>
            </div> */}
          </div>
        </div>
        <div className='game_details__description_container'>
          <h4 className='game_details__title'>Description</h4>
          {/* DESCRIPTION */}
          <p
            className='game_details__description'
            style={{
              maxWidth: gameDetails.summary == '' && '100%',
            }}
          >
            {shortenDescription(gameDetails)}{' '}
            <button
              className='game_details__info_toggler'
              onClick={toggleFullDescription}
            >
              {gameDetails.summary !== ''
                ? showFullDescription
                  ? 'Hide Full Description'
                  : 'Show Full Description'
                : ''}
            </button>
          </p>
        </div>
        <div className='game_details__actions'>
          {!currentCollection || !exists ? (
            <span className='snes_button' onClick={addGameHandler}>
              ADD
            </span>
          ) : (
            <span className='snes_button' onClick={removeGameHandler}>
              REMOVE
            </span>
          )}
          <span className='snes_button' onClick={closeDetails}>
            BACK
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
