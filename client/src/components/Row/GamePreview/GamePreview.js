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

  const determineCoverColor = () => {
    if (!gamePlatform) return;

    switch (gamePlatform.abbreviation) {
      case 'DC':
      case 'PS1':
      case 'PS2':
      case 'PSP':
        return 'black';
      case 'fds':
        return '#100e0e';
      case 'PS3':
        return 'rgba(158,158,158, .95)';
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
      case 'X360':
        return '#107C10';
      default:
        return 'rgb(23 45 62)';
      // return 'linear-gradient(120deg, #00adee, #000000);';
    }
  };

  return (
    <div
      className='game_preview__wrapper'
      style={{ pointerEvents: viewingPreview && 'none' }}
      onClick={() => console.log(game)}
    >
      <div className='game_preview__box' onClick={() => openGame()}>
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
            // style={{ background: 'linear-gradient(120deg, #00adee, #000000)' }}
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
        {viewingPreview && (
          <div
            className='game_preview__front_inside'
            style={{ background: determineCoverColor() }}
          >
            TEST
          </div>
        )}
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
            background: determineCoverColor(),
            borderTop: `${determineCoverColor()} solid 7px`,
            borderBottom: `${determineCoverColor()} solid 7px`,
            borderLeft: `${determineCoverColor()} solid 7px`,
          }}
        />
        <div
          className={`game_preview__left ${viewingPreview && 'left_open'}`}
          style={{
            background: determineCoverColor(),
            borderTop: `${determineCoverColor()} solid 7px`,
            borderBottom: `${determineCoverColor()} solid 7px`,
            // display: viewingPreview && 'none',
          }}
        />
        <div
          className={`game_preview__right ${viewingPreview && 'right_open'}`}
          style={{ background: determineCoverColor() }}
        />
        <div
          className='game_preview__top'
          // style={{ display: viewingPreview && 'none' }}
        />
        <div
          className='game_preview__bottom'
          // style={{ display: viewingPreview && 'none' }}
        />
      </div>
    </div>
  );
};
// const GamePreview = ({
//   game,
//   hideDetails,
//   displayDetails,
//   fetchGameDetails,
//   addGame,
//   viewGameSoundtrack,
// }) => {

//   // Go to the game website
//   const goToGameWebsite = (url) => {
//     window.open(url, '_blank');
//   };

//   // Wait for animation to finish before closing details
//   const closeDetails = () => {
//     setUnmounting(true);
//     setTimeout(function () {
//       hideDetails();
//     }, 150);
//   };

//   // Convert the YYYY-MM-DD to Month, Day, Year
//   const convertDate = (date) => {
//     let months = [
//       'January',
//       'February',
//       'March',
//       'April',
//       'May',
//       'June',
//       'July',
//       'August',
//       'September',
//       'October',
//       'November',
//       'December',
//     ];
//     let now = new Date(date?.replace(/-/g, '/'));
//     let currentDay = now.getDate();
//     let formattedDay;

//     // Give the numbered day the appropriate abbriviation
//     switch (currentDay) {
//       case 1:
//       case 21:
//       case 31:
//         formattedDay = currentDay + 'st';
//         break;
//       case 2:
//       case 22:
//         formattedDay = currentDay + 'nd';
//         break;
//       case 3:
//       case 23:
//         formattedDay = currentDay + 'rd';
//         break;
//       // Most days have the th ending (28th) so set as default
//       default:
//         formattedDay = currentDay + 'th';
//         break;
//     }
//     return (
//       months[now.getMonth()] + ' ' + formattedDay + ', ' + now.getFullYear()
//     );
//   };

//   if (!game) {
//     return null;
//   }

//   return (
//     <div
//       className={`game-details ${unmounting && 'hide'}`}
//       onMouseLeave={closeDetails}
//     >
//       {/* Container for Game Trailer */}
//       <div className='game-details__trailer'>
//         {game.videos ? (
//           <ReactPlayer
//             url={`https://www.youtube.com/watch?v=${game?.videos[0]?.video_id}`}
//             className='trailer'
//             width='100%'
//             height='192px'
//             playing={true}
//             onReady={() => setLoading(false)}
//           />
//         ) : (
//           <img
//             className='trailer_placeholder'
//             src={`//images.igdb.com/igdb/image/upload/t_1080p_2x/${game.cover?.image_id}.jpg`}
//           />
//         )}
//       </div>

//       {/* Game Details Container */}
//       <div className='game-details__container'>
//         <SiApplemusic
//           onClick={(e) => viewGameSoundtrack(e, game)}
//           className='row__poster_music_icon'
//           // style={{ color: activeProfile.color }}
//         />
//         <SiAddthis
//           onClick={(e) => addGame(e, game)}
//           className='row__poster_add_icon'
//           // style={{ color: activeProfile.color }}
//         />
//         <div className='game-details__details'>
//           <h3
//             className='game-details__name'
//             // onClick={goToGameWebsite(game?.website)}
//           >
//             {game?.name}
//           </h3>
//           <p className='game-details__released'>
//             Release Date: {convertDate(game?.release_dates[0].human)}
//           </p>
//           <p
//             className='game-details__more'
//             onClick={() => fetchGameDetails(game)}
//           >
//             See More Details
//           </p>
//         </div>
//         <div className='game-details__tags'>
//           <ul className='game-details__tags_list'>
//             {game.themes.slice(0, 3).map((tag, i) => (
//               <li className='game-details__tag' key={tag.name}>
//                 {i == 0 ? (
//                   <span className={'tag_no_border'}>{tag.name}</span>
//                 ) : (
//                   <span className={'tag_border'}>{tag.name}</span>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

export default GamePreview;
