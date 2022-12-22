import React, { useEffect, useState } from 'react';
import { SiApplemusic, SiAddthis } from 'react-icons/si';
import ReactPlayer from 'react-player/lazy';
import './GamePreview.css';

// Game Platform Logo Images
import playstationLogo from '../../../assets/images/playstation-logo.png';
import playstationLogoWhite from '../../../assets/images/ps4-logo.png';
import pspLogo from '../../../assets/images/psp-logo.png';
import psVitaLogo from '../../../assets/images/psvita-logo.png';
import nesLogo from '../../../assets/images/nes-logo.png';
import nintendo64Logo from '../../../assets/images/nintendo-logo.png';
import nintendoSwitchLogo from '../../../assets/images/switch_logo.png';
import nintendoDs from '../../../assets/images/ds-logo.png';
import nintendo3ds from '../../../assets/images/nintendo3ds-logo.png';
import gbaLogo from '../../../assets/images/gba-logo.png';
import wiiLogo from '../../../assets/images/wii_logo.png';
import wiiULogo from '../../../assets/images/wiiu-logo.png';
import xboxLogo from '../../../assets/images/xbox-logo.png';
import steamLogo from '../../../assets/images/steam-logo-transparent.png';
import iosLogo from '../../../assets/images/apple-logo.png';
import androidLogo from '../../../assets/images/android-logo.png';
import segaLogo from '../../../assets/images/sega-logo.png';
import snesLogo from '../../../assets/images/snes-logo.png';
import gamecubeLogo from '../../../assets/images/gamecube-logo.png';

import marioStanding from '../../../assets/images/mario_pixel_standing.png';
import marioJumping from '../../../assets/images/mario_pixel_jumping.png';

const GamePreview = ({
  game,
  hideDetails,
  gameCover,
  ratingImage,
  displayDetails,
  fetchGameDetails,
  addGame,
  viewGameSoundtrack,
  viewingPreview,
  openGame,
  closeGame,
}) => {
  const [loading, setLoading] = useState(false);
  const [unmounting, setUnmounting] = useState(false);
  const [playingDisc, setPlayingDisc] = useState(false);

  const [hoveringAdd, setHoveringAdd] = useState(false);
  const [hoveringDetails, setHoveringDetails] = useState(false);

  useEffect(() => {
    closeGame();
  }, [game]);
  const gamePlatformId = game.release_dates.sort(function (a, b) {
    return a.date - b.date;
  })[0].platform;
  const gamePlatform = game.platforms.filter(
    (platform) => platform.id == gamePlatformId
  )[0];

  // Convert name of platforms into a PNG icon
  const displayConsoleIcons = (platform) => {
    switch (platform) {
      case 'PlayStation':
      case 'PS1':
      case 'PlayStation 2':
      case 'PS2':
      case 'PlayStation 3':
      case 'PS3':
      case 'PlayStation 5':
      case 'PS5':
      case 'PSP':
        return (
          <img
            src={playstationLogo}
            alt={platform}
            className='game_preview__platform_logo playstation'
          />
        );
      case 'PlayStation 4':
      case 'PS4':
        return (
          <img
            src={playstationLogoWhite}
            alt={platform}
            className='game_preview__platform_logo playstation'
          />
        );
      case 'PlayStation Portable':
      case 'PSP':
        return (
          <img
            src={pspLogo}
            alt={platform}
            className='game_preview__platform_logo'
          />
        );
      case 'Vita':
        return (
          <img
            src={psVitaLogo}
            alt={platform}
            className='game_preview__platform_logo'
          />
        );
      case 'Switch':
        return (
          <img
            src={nintendoSwitchLogo}
            alt={platform}
            className='game_preview__platform_logo switch'
          />
        );
      case 'Nintendo 64':
      case 'N64':
      case 'Nintendo 64DD':
        return (
          <img
            src={nintendo64Logo}
            alt={platform}
            className='game_preview__platform_logo n64'
          />
        );
      case 'Nintendo DS':
      case 'NDS':
        return (
          <img
            src={nintendoDs}
            alt={platform}
            className='game_preview__platform_logo nintendo-ds'
          />
        );
      case 'GBA':
        return (
          <img
            src={gbaLogo}
            alt={platform}
            className='game_preview__platform_logo'
          />
        );
      case 'Nintendo 3DS':
      case 'New Nintendo 3DS':
      case '3DS':
        return (
          <img
            src={nintendo3ds}
            alt={platform}
            className='game_preview__platform_logo nintendo-3ds'
          />
        );
      case 'Nintendo GameCube':
      case 'NGC':
        return (
          <img
            src={gamecubeLogo}
            alt={platform}
            className='game_preview__platform_logo gamecube'
          />
        );
      case 'Wii':
        return (
          <img
            src={wiiLogo}
            alt={platform}
            className='game_preview__platform_logo wii'
          />
        );
      case 'Wii U':
      case 'WiiU':
        return (
          <img
            src={wiiULogo}
            alt={platform}
            className='game_preview__platform_logo wiiU'
          />
        );
      case 'SNES':
        return (
          <img
            src={snesLogo}
            alt={platform}
            className='game_preview__platform_logo'
          />
        );
      case 'NES':
      case 'fds':
        return (
          <img
            src={nesLogo}
            alt={platform}
            className='game_preview__platform_logo nes'
          />
        );
      case 'Xbox':
      case 'XBOX':
      case 'XONE':
      case 'Xbox One':
      case 'Xbox 360':
      case 'X360':
      case 'Series X':
        return (
          <img
            src={xboxLogo}
            alt={platform}
            className='game_preview__platform_logo xbox'
          />
        );
      case 'iOS':
      case 'Mac':
        return (
          <img
            src={iosLogo}
            alt={platform}
            className='game_preview__platform_logo'
          />
        );
      case 'Android':
      case 'Linux':
        return (
          <img
            src={androidLogo}
            alt={platform}
            className='game_preview__platform_logo'
          />
        );
      case 'SEGA':
      case 'Dreamcast':
        return (
          <img
            src={segaLogo}
            alt={platform}
            className='game_preview__platform_logo'
          />
        );
      default:
        return (
          <img
            src={steamLogo}
            alt='PC'
            className='game_preview__platform_logo steam'
          />
        );
    }
  };

  // Go to the game website
  const goToGameWebsite = (url) => {
    window.open(url, '_blank');
  };

  // Wait for animation to finish before closing details
  const closeDetails = () => {
    setUnmounting(true);
    setTimeout(function () {
      hideDetails();
    }, 150);
  };

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

  if (!game) {
    return null;
  }

  // Based on the game platform, adjust the colors to reflect the platform/console color scheme
  const determineCoverColor = () => {
    if (!gamePlatform) return;

    switch (gamePlatform.abbreviation) {
      case 'DC':
      case 'PS1':
      case 'PS2':
      case 'PSP':
      case 'fds':
        return '#100e0e';
      case 'PS3':
        return '#9e9e9e';
      case 'N64':
        return '#CC0000';
      case 'Switch':
        return '#e4000f';
      case 'PS4':
        return '#003791';
      case 'PS5':
      case 'NDS':
      case '3DS':
      case 'Wii':
        return '#FFF5EE';
      case 'WiiU':
        return '#009ac7';
      case 'NGC':
        return '#100e0e';
      // return '#645097';
      case 'XONE':
      case 'XBOX':
        return '#107C10';
      case 'X360':
        return '#5dc21e';
      default:
        return '#172d3e';
      // return 'linear-gradient(120deg, #00adee, #000000);';
    }
  };

  return (
    <div className='game_preview__wrapper' onClick={() => console.log(game)}>
      <div
        className={`game_preview__box ${viewingPreview && 'box_open'}`}
        onClick={() => openGame()}
      >
        {/* FRONT SIDE OF CASE */}
        <div
          className={`game_preview__front ${
            gamePlatform.abbreviation == 'Switch' && 'switch_case'
          } ${viewingPreview && 'game_preview__front_open'}`}
          style={{
            backgroundImage: `url(${gameCover})`,
            borderTop: `${determineCoverColor()} solid 29px`,
            borderBottom: `${determineCoverColor()} solid 7px`,
            borderRight: `${determineCoverColor()} solid 7px`,
          }}
        >
          {/* <div className='game_preview__gradient' /> */}
          <div
            className={`game_preview__front_banner ${
              gamePlatform.abbreviation == 'Switch' && 'switch_banner'
            }`}
            style={{ background: determineCoverColor() }}
          >
            {displayConsoleIcons(gamePlatform.abbreviation)}

            {/* PLATFORM NAME */}
            <p
              className={
                gamePlatform.abbreviation == 'N64'
                  ? 'nintendo_font'
                  : gamePlatform.abbreviation == 'X360'
                  ? 'xbox_font'
                  : gamePlatform.abbreviation == 'PS4'
                  ? 'modern_playstation_font'
                  : gamePlatform.abbreviation == 'PS5'
                  ? 'modern_playstation_font'
                  : gamePlatform.abbreviation == 'PS3'
                  ? 'modern_playstation_font'
                  : gamePlatform.abbreviation == 'PS2'
                  ? 'old_playstation_font'
                  : gamePlatform.abbreviation == 'PS1'
                  ? 'old_playstation_font'
                  : ''
              }
              style={{
                display:
                  gamePlatform.abbreviation == 'Switch'
                    ? 'none'
                    : gamePlatform.abbreviation == 'fds'
                    ? 'none'
                    : gamePlatform.abbreviation == 'Wii'
                    ? 'none'
                    : gamePlatform.abbreviation == '3DS'
                    ? 'none'
                    : gamePlatform.abbreviation == 'NDS'
                    ? 'none'
                    : gamePlatform.abbreviation == 'NGC'
                    ? 'none'
                    : '',
              }}
            >
              {gamePlatform.abbreviation == 'PC'
                ? 'Steam'
                : gamePlatform.abbreviation == 'X360'
                ? gamePlatform.name.toUpperCase()
                : gamePlatform.abbreviation == 'PS1'
                ? gamePlatform.name
                : gamePlatform.abbreviation == 'PS2'
                ? gamePlatform.name
                : gamePlatform.abbreviation == 'N64'
                ? gamePlatform.name
                : gamePlatform.abbreviation == 'WiiU'
                ? ''
                : gamePlatform.abbreviation}
            </p>
          </div>
          {ratingImage}
        </div>

        {/* INSIDE OF FRONT  */}
        {viewingPreview && (
          <div
            className={`game_preview__front_inside ${
              gamePlatform.abbreviation == 'Switch' && 'switch_case_back'
            }`}
            style={{
              background: `${determineCoverColor()}`,
              borderTop: `${determineCoverColor()} solid 7px`,
              borderBottom: `${determineCoverColor()} solid 7px`,
              borderLeft: `${determineCoverColor()} solid 7px`,
            }}
          >
            {/* Game Manual */}
            <img src={gameCover} className='game_preview__manual' />
            {/* The crease to give 3D Effect */}
            <div className='game_preview__manual_middle_crease' />
            <div className='game_preview__manual_bottom_crease' />
            {/* ESRB IMAGE */}
            {ratingImage}

            <div className='game_preview__front_inside_details'>
              {/* TABS */}
              <div
                className='game_preview__manual_tab_top'
                style={{
                  '--color-theme': determineCoverColor(),
                }}
              />
              <div
                className='game_preview__manual_tab_bottom'
                style={{
                  '--color-theme': determineCoverColor(),
                }}
              />
              {/* {game.videos && (
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${game?.videos[0]?.video_id}`}
                  className='trailer'
                  width='100%'
                  height='250px'
                  playing={true}
                  onReady={() => setLoading(false)}
                />
              )} */}
            </div>
          </div>
        )}

        {/* MIDDLE CREASE */}
        <div
          className={`game_preview__middle ${viewingPreview && 'middle_open'}`}
          style={{
            background: determineCoverColor() + 'b5',
            borderTop: `${determineCoverColor()} solid 4px`,
            borderBottom: `${determineCoverColor()} solid 4px`,
          }}
        />

        {/* BACK SIDE OF CASE */}
        <div
          className={`game_preview__back ${
            gamePlatform.abbreviation == 'Switch' && 'switch_case_back'
          }
          ${
            viewingPreview &&
            `game_preview__back_open ${
              gamePlatform.abbreviation == 'Switch' ? 'switch_case_open' : ''
            }`
          }
        `}
          style={{
            background: `url(${gameCover})`,
            // background: determineCoverColor(),
            borderTop: `${determineCoverColor()} solid 24px`,
            borderBottom: `${determineCoverColor()} solid 7px`,
            borderLeft: `${determineCoverColor()} solid 7px`,
          }}
        >
          {viewingPreview && (
            <div className='game_preview__back_open_details'>
              <img
                src={
                  game?.artworks?.length > 1
                    ? `//images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.artworks[1]?.image_id}.jpg`
                    : gameCover
                }
              />

              {/* MARIO PIPE BUTTONS */}
              <div className='game_preview__actions'>
                {hoveringAdd && (
                  <img
                    src={marioStanding}
                    className='mario_pixel'
                    style={{ left: '45px', bottom: '74px' }}
                  />
                )}

                <button
                  onMouseOver={() => setHoveringAdd(true)}
                  onMouseOut={() => setHoveringAdd(false)}
                >
                  Add
                </button>
                {hoveringDetails && (
                  <img
                    src={marioStanding}
                    className='mario_pixel'
                    style={{ left: '152px', bottom: '74px' }}
                  />
                )}
                <button
                  onMouseOver={() => setHoveringDetails(true)}
                  onMouseOut={() => setHoveringDetails(false)}
                >
                  Details
                </button>
              </div>

              {/* DISC ART */}
              <div
                className={`game_preview__disc ${
                  playingDisc && 'playing_disc'
                }`}
                style={{
                  '--color-theme': determineCoverColor(),
                  backgroundImage: `url(${
                    game?.artworks?.length > 0
                      ? `//images.igdb.com/igdb/image/upload/t_1080p/${game.artworks[0]?.image_id}.jpg`
                      : gameCover
                  })`,
                  backgroundSize: 'cover',
                }}
                onClick={() => setPlayingDisc(!playingDisc)}
              >
                <div className='game_preview__disc_center' />
                <div
                  className='game_theme'
                  style={{
                    '--color-theme': determineCoverColor(),
                  }}
                />
                <div
                  className='game_preview__disc_console_banner'
                  style={{
                    background: determineCoverColor(),
                  }}
                >
                  <p
                    className={
                      gamePlatform.abbreviation == 'N64'
                        ? 'nintendo_font'
                        : gamePlatform.abbreviation == 'X360'
                        ? 'xbox_font'
                        : gamePlatform.abbreviation == 'PS4'
                        ? 'modern_playstation_font'
                        : gamePlatform.abbreviation == 'PS5'
                        ? 'modern_playstation_font'
                        : gamePlatform.abbreviation == 'PS3'
                        ? 'modern_playstation_font'
                        : gamePlatform.abbreviation == 'PS2'
                        ? 'old_playstation_font'
                        : gamePlatform.abbreviation == 'PS1'
                        ? 'old_playstation_font'
                        : ''
                    }
                  >
                    {gamePlatform.abbreviation}
                  </p>
                  {displayConsoleIcons(gamePlatform.abbreviation)}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* LEFT SIDE OF CASE */}
        <div
          className={`game_preview__left ${viewingPreview && 'left_open'}`}
          style={{
            '--color-theme': determineCoverColor(),
          }}
        />

        {/* RIGHT SIDE OF CASE */}
        <div
          className={`game_preview__right ${
            viewingPreview &&
            gamePlatform.abbreviation == 'Switch' &&
            'switch_case_right'
          } ${viewingPreview && 'right_open'}`}
          style={{
            '--color-theme': determineCoverColor(),
            background: determineCoverColor(),
          }}
        />

        {/* TOP OF CASE */}
        <div
          className={`game_preview__top ${viewingPreview && 'top_open_right'}`}
        />
        <div
          className='top_open_left'
          style={{ display: !viewingPreview && 'none' }}
        />

        {/* BOTTOM OF CASE */}
        <div
          className={`game_preview__bottom ${viewingPreview && 'bottom_open'}`}
        />
      </div>
    </div>
  );
};

export default GamePreview;
