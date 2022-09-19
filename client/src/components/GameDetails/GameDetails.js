import React, { useEffect, useState } from 'react';
import rawgClient from '../../axios';
import youtube from '../../youtubeAPI';
import ReactPlayer from 'react-player/lazy';
import './GameDetails.css';
import axios from 'axios';
// ESRB Logos
import spotifyLogo from '../../assets/images/spotify_logo.png';
import eRating from '../../assets/images/ESRB_E.png';
import tRating from '../../assets/images/ESRB_T.png';
import mRating from '../../assets/images/ESRB_M.png';
import rpRating from '../../assets/images/ESRB_RP.png';
// Game Platform Logo Images
import playstationLogo from '../../assets/images/playstation-logo.png';
import nintendoLogo from '../../assets/images/nintendo-logo.png';
import xboxLogo from '../../assets/images/xbox-logo.png';
import steamLogo from '../../assets/images/steam-logo.png';
import iosLogo from '../../assets/images/apple-logo.png';
import androidLogo from '../../assets/images/android-logo.png';

const GameDetails = ({ game, closeDetails, spotifyToken }) => {
  const [details, setDetails] = useState({});
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeScreenshot, setActiveScreenshot] = useState(
    game.background_image
  );

  useEffect(() => {
    const fetchGameDetails = async () => {
      const request = await rawgClient.get(
        `games/${game.id}?key=${process.env.REACT_APP_RAWG_API_KEY}`
      );
      console.log(request);
      setDetails((previousDetails) => ({
        ...previousDetails,
        info: request.data,
      }));
    };
    fetchGameDetails();
  }, []);

  useEffect(() => {
    const fetchYoutubeTrailer = async () => {
      try {
        const request = await youtube.youtubeAPI.get('/search', {
          params: {
            q: game.name + ' Trailer',
          },
        });
        setDetails((previousDetails) => ({
          ...previousDetails,
          trailer: request.data.items[0],
        }));
      } catch (error) {
        if (error.response.status !== 200) {
          return null;
        }
      }
    };
    fetchYoutubeTrailer();
  }, []);

  useEffect(() => {
    if (!spotifyToken) return;
    const fetchGameOST = async () => {
      try {
        const request = await axios.get('/app/spotify_album', {
          params: {
            game: game.name,
            token: spotifyToken,
          },
        });

        setDetails((previousDetails) => ({
          ...previousDetails,
          soundtrack: request.data.tracks,
        }));
      } catch (error) {
        console.log('OST FETCH ISSUE');
      }
    };
    fetchGameOST();
  }, [spotifyToken]);

  useEffect(() => {
    const fetchGameScreenshots = async () => {
      try {
        const request = await rawgClient.get(
          `games/${game.id}/screenshots?key=${process.env.REACT_APP_RAWG_API_KEY}`
        );
        setDetails((previousDetails) => ({
          ...previousDetails,
          screenshots: request.data.results,
        }));
      } catch (error) {
        console.log(error);
      }
    };
    fetchGameScreenshots();
  }, []);

  const toggleFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const shortenDescription = (description) => {
    if (description == undefined) return;
    const cleanGame = description.replace(/<[^>]*>?/gm, '');
    const cleanedGame = cleanGame.replace(/&#39;/g, "'").trim();

    if (cleanedGame.length > 300 && showFullDescription == false) {
      return cleanedGame.split('').slice(0, 300).join('') + '...';
    } else {
      return cleanedGame;
    }
  };

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

  const determineESRB = () => {
    if (details.info == undefined) return;
    const esrb = details.info.esrb_rating;
    switch (esrb) {
      case 'Everyone':
      case 'Everyone 10+':
        return <img className='game_details__esrb' src={eRating} />;
      case 'Teen':
        return <img className='game_details__esrb' src={tRating} />;
      case 'Mature':
        return <img className='game_details__esrb' src={mRating} />;
      default:
        return <img className='game_details__esrb' src={rpRating} />;
    }
  };

  if (Object.keys(details).length == 0) {
    return;
  }

  return (
    <div className='game_details__wrapper'>
      <img className='game_details__background' src={game.background_image} />
      <div className='game_details__container'>
        <h2>{game.name}</h2>
        <div className='game_details__details'>
          <div className='game_details__media'>
            {details.trailer !== undefined ? (
              <ReactPlayer
                url={`https://www.youtube.com/embed/${details.trailer.id.videoId}`}
                className='media_trailer'
                height='400px'
                light={true}
              />
            ) : (
              <div className='media_placeholder'>
                <img className='details_img' src={activeScreenshot} />
                {determineESRB()}
              </div>
            )}
            <div className='game_details__screenshots'>
              <img
                src={game.background_image}
                className='screenshot_thumbnail'
                onClick={() => setActiveScreenshot(game.background_image)}
                style={{
                  border:
                    game.background_image == activeScreenshot
                      ? '1px solid lightblue'
                      : '1px solid transparent',
                }}
              />
              {details?.screenshots.map((screenshot) => (
                <img
                  key={screenshot.id}
                  style={{
                    border:
                      screenshot.image == activeScreenshot
                        ? '1px solid lightblue'
                        : '1px solid transparent',
                  }}
                  src={screenshot.image}
                  onClick={() => setActiveScreenshot(screenshot.image)}
                  className='screenshot_thumbnail'
                />
              ))}
            </div>
            <div className='media_soundtrack__container'>
              <img className='media_soundtrack__background' src={spotifyLogo} />
              <div className='media_soundtracks'>
                {/* <h4>Spotify OST</h4> */}
                <ul className='soundtracks'>
                  {details.soundtrack?.map((track) => (
                    <li key={track.id} className='soundtrack'>
                      {track.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className='game_details__info_container'>
            <h4 className='game_details__title'>Description</h4>
            <p className='game_details__description'>
              {shortenDescription(details?.info?.description_raw)}{' '}
              <button
                className='game_details__info_toggler'
                onClick={toggleFullDescription}
              >
                {showFullDescription
                  ? 'Hide Full Description'
                  : 'Show Full Description'}
              </button>
            </p>
          </div>
          <div className='game_details__data'>
            <div className='game_details__publishers'>
              <h4 className='game_details__title'>Publishers</h4>
              <ul className='publishers_list'>
                {details.info?.publishers.map((publisher) => (
                  <li key={publisher.id} className='publisher'>
                    {publisher.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className='game_details__platforms'>
              <h4 className='game_details__title'>Platforms</h4>
              <ul className='platforms_list'>
                {details.info?.parent_platforms.map((platform) => (
                  <li key={platform.platform.id} className='platform'>
                    {platform.platform.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className='game_details__rating'>
              <h4 className='game_details__title'>Rating</h4>
              <p>
                {details.info?.metacritic !== undefined
                  ? details.info?.metacritic
                  : details.info?.rating * 20}
                %
              </p>
            </div>
            <div className='game_details__released'>
              <h4 className='game_details__title'>Release Date</h4>
              <p>{convertDate(details?.info.released)}</p>
            </div>
          </div>
        </div>
        <div className='game_details__actions'>
          <span>ADD</span>
          <span onClick={closeDetails}>BACK</span>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;