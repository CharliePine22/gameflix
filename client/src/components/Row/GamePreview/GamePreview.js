import React, { useEffect, useState, useRef } from 'react';
import { SiApplemusic, SiAddthis } from 'react-icons/si';
import { AiOutlineExpandAlt } from 'react-icons/ai';
import ReactPlayer from 'react-player/lazy';
import './GamePreview.css';
import Tilt from 'react-parallax-tilt';

// Game Platform Logo Images
import playstationLogo from '../../../assets/images/playstation-logo.png';
import playstationLogoWhite from '../../../assets/images/ps4-logo.png';
// PSP
import pspLogo from '../../../assets/images/psp-logo.png';
// PS Vita
import psVitaLogo from '../../../assets/images/psvita-logo.png';
// PlayStation 1
import ps1Sound from '../../../assets/sounds/platform_sounds/ps1-startup.mp3';
// PlayStation 2
import ps2DiscBanner from '../../../assets/images/ps2-disc-banner.png';
import nesLogo from '../../../assets/images/nes-logo.png';
import ps2Sound from '../../../assets/sounds/platform_sounds/ps2-startup.mp3';
// Nintendo 64
import nintendo64Logo from '../../../assets/images/nintendo-logo.png';
import nintendo64Case from '../../../assets/images/n64-case-template-e.png';
import nintendo64Cart from '../../../assets/images/n64-game-template.png';
// Nintendo Switch
import nintendoSwitchLogo from '../../../assets/images/switch_logo.png';
// GameCube
import gamecubeLogo from '../../../assets/images/gamecube-logo.png';
import gamecubeBanner from '../../../assets/images/gamecube-disc-banner.png';
import gamecubeBackCover from '../../../assets/images/gamecube-cover-back.png';
// Nintendo DS/3DS
import nintendoDs from '../../../assets/images/ds-logo.png';
import nintendo3ds from '../../../assets/images/nintendo3ds-logo2.png';
// Gameboy Advanced
import gbaLogo from '../../../assets/images/gba-logo.png';
// Wii
import wiiLogo from '../../../assets/images/wii_logo.png';
// Wii U
import wiiULogo from '../../../assets/images/wiiu-logo.png';
import wiiUDiscBanner from '../../../assets/images/wiiu-disc-banner.png';
// Xbox 360
import xboxLogo from '../../../assets/images/xbox-logo.png';
import xbox360Banner from '../../../assets/images/xbox360-banner.webp';
import xbox360Disc from '../../../assets/images/xbox360-disc-template.png';
import xbox360Side from '../../../assets/images/360-side.png';
import xbox360Sound from '../../../assets/sounds/platform_sounds/360-startup.mp3';
// Steam Logo
import steamLogo from '../../../assets/images/steam-logo-transparent.png';
// Apple Logo
import iosLogo from '../../../assets/images/apple-logo.png';
// Android Logo
import androidLogo from '../../../assets/images/android-logo.png';
// Sega Logo
import segaLogo from '../../../assets/images/sega-logo.png';
// SNES Logo
import snesLogo from '../../../assets/images/snes-logo.png';

// Gmae Platform Startup Sounds
import gamecubeSound from '../../../assets/sounds/platform_sounds/gamecube-startup.mp3';
import n64Sound from '../../../assets/sounds/platform_sounds/n64-startup.mp3';

import pipeAudio from '../../../assets/sounds/pipe-sound.mp3';
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
  const [marioTransition, setMarioTransition] = useState(false);
  const [hoveringAdd, setHoveringAdd] = useState(false);
  const [hoveringDetails, setHoveringDetails] = useState(false);

  const gamePlatformId = game.release_dates.sort(function (a, b) {
    return a.date - b.date;
  })[0].platform;

  const gamePlatform = game.platforms.filter(
    (platform) => platform.id == gamePlatformId
  )[0];

  let audio = new Audio(pipeAudio);
  const determineConsoleAudio = () => {
    if (!gamePlatform) return;
    switch (gamePlatform.abbreviation) {
      case 'DC':
      case 'PS1':
        return ps1Sound;
      case 'PS2':
        return ps2Sound;
      case 'NGC':
        return gamecubeSound;
      case 'X360':
        return xbox360Sound;

      default:
        return null;
    }
  };

  useEffect(() => {
    closeGame();
  }, [game.id]);

  const consoleAudio = useRef(new Audio(determineConsoleAudio()));

  const playConsoleStartup = () => {
    if (!playingDisc) {
      setPlayingDisc(true);
      consoleAudio.current.play();
    } else {
      setPlayingDisc(false);
      consoleAudio.current.pause();
      consoleAudio.current.currentTime = 0;
    }
  };

  // Convert name of platforms into a PNG icon
  const displayConsoleIcons = (platform) => {
    switch (platform) {
      case 'PlayStation 2':
      case 'PS2':
        return (
          <img
            src={playstationLogo}
            alt={platform}
            className='game_preview__platform_logo playstation_old'
          />
        );
      case 'PlayStation':
      case 'PS1':
      case 'PlayStation 5':
      case 'PS5':
      case 'PSP':
        return (
          <img
            src={playstationLogo}
            alt={platform}
            className='game_preview__platform_logo playstation_new'
          />
        );
      case 'PlayStation 3':
      case 'PS3':
      case 'PlayStation 4':
      case 'PS4':
        return (
          <img
            src={playstationLogoWhite}
            alt={platform}
            className='game_preview__platform_logo playstation_new'
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

  const determineSideBanner = () => {
    switch (gamePlatform.abbreviation) {
      case 'X360':
        return xbox360Side;
      default:
        return '';
    }
  };

  const determineBackCover = () => {
    switch (gamePlatform.abbreviation) {
      case 'NGC':
        return gamecubeBackCover;
      default:
        return '';
    }
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
      // return '#9e9e9eB9';
      case 'N64':
        return '#EB1718';
      case 'Switch':
        return '#e4000f';
      case 'PS4':
        return '#003791';
      case 'PS5':
      case 'NDS':
      case '3DS':
      case 'Wii':
        return '#FFFFFF';
      case 'WiiU':
        return '#009ac7';
      case 'NGC':
        return '#100e0e';
      // return '#645097';
      case 'XONE':
      case 'XBOX':
      case 'Series X':
        return '#107C10';
      case 'X360':
        return '#5dc21e';
      default:
        return '#172d3e';
      // return 'linear-gradient(120deg, #00adee, #000000);';
    }
  };

  // Allow mario animation to finish before redirecting user to details page
  const delayDetails = async () => {
    audio.play();
    setMarioTransition(true);
    await new Promise((res) => setTimeout(res, 1600));
    fetchGameDetails(game);
    setMarioTransition(false);
  };

  if (!game) {
    return null;
  }

  console.log(viewingPreview);

  return (
    <div className='game_preview__wrapper' onClick={() => console.log(game)}>
      <Tilt
        tiltEnable={!viewingPreview}
        glareEnable={true}
        tiltMaxAngleX={30}
        tiltMaxAngleY={35}
        perspective={1000}
        glarePosition={'all'}
        glareBorderRadius={'0 4px 4px 0'}
        transitionEasing={'cubic-bezier(.03,.98,.52,.99)'}
        glareMaxOpacity={'.35'}
        glareColor={'rgba(255,255,255, 1)'}
        // className='game_preview__box'
        onLeave={() => console.log('LEAVING CARD')}
        style={{ height: 386, width: 250, transformStyle: 'preserve-3d' }}
      >
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
              height: `${
                gamePlatform.abbreviation == 'PS1' ||
                (gamePlatform.abbreviation == 'N64' && '365px')
              }`,

              backgroundPosition:
                gamePlatform.abbreviation == 'PS1' && '-90% 50%',
              borderTop: `${determineCoverColor()} solid ${
                gamePlatform.abbreviation == 'PS1' ||
                gamePlatform.abbreviation == 'N64'
                  ? '8px'
                  : '31px'
              }`,
              borderBottom: `${determineCoverColor()} solid 4px`,
              borderRight: `${determineCoverColor()} solid 7px`,
            }}
          >
            {gamePlatform.abbreviation == 'N64' && (
              <img src={nintendo64Case} className='n64_game_img' />
            )}

            {/* FRONT CASE COVER BANNER */}
            <div
              className={`game_preview__front_banner ${
                gamePlatform.abbreviation == 'Switch' && 'switch_banner'
              }
            ${gamePlatform.abbreviation == 'X360' && 'xbox360_banner'}
            ${gamePlatform.abbreviation == 'PS1' && 'ps1_banner'}
            ${gamePlatform.abbreviation == 'PS2' && 'ps2_banner'}
            ${gamePlatform.abbreviation == 'PS3' && 'ps3_banner'}
            ${gamePlatform.abbreviation == 'PS4' && 'ps4_banner'}
            ${gamePlatform.abbreviation == 'Wii' && 'wii_banner'}
            ${gamePlatform.abbreviation == 'Series X' && 'seriesX_banner'}
            ${gamePlatform.abbreviation == 'N64' && 'n64_banner'}
            `}
              style={{ background: determineCoverColor() }}
            >
              {displayConsoleIcons(gamePlatform.abbreviation)}
              {gamePlatform.abbreviation == 'X360' && (
                <img src={xbox360Banner} />
              )}

              {/* PLATFORM NAME */}
              <p
                className={
                  gamePlatform.abbreviation == 'N64'
                    ? 'nintendo_font'
                    : gamePlatform.abbreviation == 'X360' ||
                      gamePlatform.abbreviation == 'Series X'
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
                  : gamePlatform.abbreviation == 'Series X'
                  ? `Xbox ${gamePlatform.abbreviation}`
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
            className={`game_preview__middle ${
              viewingPreview && 'middle_open'
            }`}
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
              background: `url(${
                game?.artworks?.length > 1
                  ? `//images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.artworks[1]?.image_id}.jpg`
                  : gameCover
              })`,
              borderTop: `${determineCoverColor()} solid ${
                gamePlatform.abbreviation == 'PS1' ||
                gamePlatform.abbreviation == 'N64'
                  ? '8px'
                  : '24px'
              }`,
              borderBottom: `${determineCoverColor()} solid 4px`,
              borderLeft: `${determineCoverColor()} solid 7px`,
            }}
          >
            <img src={determineBackCover()} />
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
                  {hoveringAdd && !marioTransition && (
                    <img
                      src={marioStanding}
                      className={`mario_pixel ${
                        marioTransition && 'down_pipe'
                      }`}
                      style={{ left: '45px', bottom: '74px' }}
                    />
                  )}

                  <button
                    onMouseOver={() => setHoveringAdd(true)}
                    onMouseOut={() => setHoveringAdd(false)}
                    onClick={(e) => addGame(e, game)}
                  >
                    Add
                  </button>
                  {(hoveringDetails || marioTransition) && (
                    <img
                      src={marioStanding}
                      className={`mario_pixel ${
                        marioTransition && 'down_pipe'
                      }`}
                      style={{ left: '152px', bottom: '74px' }}
                    />
                  )}
                  <button
                    onClick={() => delayDetails()}
                    onMouseOver={() => setHoveringDetails(true)}
                    onMouseOut={() => setHoveringDetails(false)}
                  >
                    Details
                  </button>
                </div>

                {/* DISC ART */}
                <div
                  className={`game_preview__disc 
                ${gamePlatform.abbreviation == 'NGC' && 'gamecube_disc'}
                ${playingDisc && 'playing_disc'}`}
                  style={{
                    '--color-theme': determineCoverColor(),
                    display: gamePlatform.abbreviation == 'N64' && 'none',
                    backgroundImage: `url(${
                      game?.artworks?.length > 0
                        ? `//images.igdb.com/igdb/image/upload/t_1080p/${game.artworks[0]?.image_id}.jpg`
                        : gameCover
                    })`,
                  }}
                  onClick={() => playConsoleStartup()}
                >
                  <div
                    className={`game_preview__disc_center ${
                      gamePlatform.abbreviation == 'NGC' &&
                      'gamecube_disc_center'
                    }`}
                  />
                  <div
                    className={`game_theme ${
                      gamePlatform.abbreviation == 'NGC' &&
                      'gamecube_game_theme'
                    }`}
                    style={{
                      '--color-theme': determineCoverColor(),
                    }}
                  />
                  {/* DISC BANNER */}
                  <div
                    className={`game_preview__disc_console_banner ${
                      gamePlatform.abbreviation == 'X360' &&
                      'xbox360_disc_banner'
                    } ${
                      gamePlatform.abbreviation == 'NGC' &&
                      'gamecube_disc_banner'
                    }`}
                    style={{
                      background:
                        gamePlatform.abbreviation == 'WiiU'
                          ? 'transparent'
                          : determineCoverColor(),
                    }}
                  >
                    {/* XBOX 360 DISC BANNER */}
                    {gamePlatform.abbreviation == 'X360' && (
                      <img src={xbox360Disc} />
                    )}
                    {/* GAMECUBE DISC BANNER */}
                    {gamePlatform.abbreviation == 'NGC' && (
                      <img src={gamecubeBanner} />
                    )}
                    {/* PLAYSTATION 2 DISC BANNER */}
                    {gamePlatform.abbreviation == 'PS2' && (
                      <img className='ps2_disc_banner' src={ps2DiscBanner} />
                    )}
                    {/* WII U DISC BANNER */}
                    {gamePlatform.abbreviation == 'WiiU' && (
                      <img className='wiiu_disc_banner' src={wiiUDiscBanner} />
                    )}
                  </div>
                </div>
                {gamePlatform.abbreviation == 'N64' && (
                  <>
                    <div
                      style={{
                        backgroundImage: `url(${nintendo64Cart})`,
                      }}
                      className='n64_cartridge'
                    >
                      <img
                        src={
                          game?.artworks?.length > 0
                            ? `//images.igdb.com/igdb/image/upload/t_1080p/${game.artworks[0]?.image_id}.jpg`
                            : gameCover
                        }
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* LEFT SIDE OF CASE */}
          <div
            className={`game_preview__left ${viewingPreview && 'left_open'}`}
            style={{
              '--color-theme': determineCoverColor(),
              background: `url(${determineSideBanner()})`,
              backgroundSize: 'cover',
              backgroundPosition: '50% 100%',
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
            className={`game_preview__top ${
              viewingPreview && 'top_open_right'
            }`}
            style={{
              '--color-theme': determineCoverColor(),
              background: determineCoverColor(),
            }}
          />
          <div
            className='top_open_left'
            style={{ display: !viewingPreview && 'none' }}
          />

          {/* BOTTOM OF CASE */}
          <div
            className={`game_preview__bottom ${
              viewingPreview && 'bottom_open'
            }`}
          />
        </div>
      </Tilt>
    </div>
  );
};

export default GamePreview;
