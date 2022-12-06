import React, { useEffect, useState } from 'react';
import { SiApplemusic, SiAddthis } from 'react-icons/si';
import ReactPlayer from 'react-player/lazy';
import './GamePreview.css';

// Game Platform Logo Images
import playstationLogo from '../../../assets/images/playstation-logo.png';
import pspLogo from '../../../assets/images/psp-logo.png';
import psVitaLogo from '../../../assets/images/psvita-logo.png';
import nesLogo from '../../../assets/images/nes-logo.png';
import nintendoLogo from '../../../assets/images/nintendo-logo.png';
import nintendoDs from '../../../assets/images/nintendo-ds.png';
import nintendo3ds from '../../../assets/images/nintendo-3ds.png';
import gbaLogo from '../../../assets/images/gba-logo.png';
import wiiLogo from '../../../assets/images/wii-logo.png';
import wiiULogo from '../../../assets/images/wiiu-logo.png';
import xboxLogo from '../../../assets/images/xbox-logo.png';
import steamLogo from '../../../assets/images/steam-logo.png';
import iosLogo from '../../../assets/images/apple-logo.png';
import androidLogo from '../../../assets/images/android-logo.png';
import segaLogo from '../../../assets/images/sega-logo.png';
import snesLogo from '../../../assets/images/snes-logo.png';
import gamecubeLogo from '../../../assets/images/gamecube-logo.png';

const GamePreview = ({
  game,
  hideDetails,
  displayDetails,
  fetchGameDetails,
  addGame,
  viewGameSoundtrack,
}) => {
  const [loading, setLoading] = useState(false);
  const [unmounting, setUnmounting] = useState(false);

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

  // return <div className='game_preview__modal' />;
};
// const GamePreview = ({
//   game,
//   hideDetails,
//   displayDetails,
//   fetchGameDetails,
//   addGame,
//   viewGameSoundtrack,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [unmounting, setUnmounting] = useState(false);

//   // Convert name of platforms into a PNG icon
//   const displayConsoleIcons = (platform) => {
//     switch (platform) {
//       case 'PC (Microsoft Windows)':
//       case 'PC':
//         return <img src={steamLogo} alt='PC' className='game_platform_logo' />;
//       case 'PlayStation':
//       case 'PS1':
//       case 'PlayStation 2':
//       case 'PS2':
//       case 'PlayStation 3':
//       case 'PS3':
//       case 'PlayStation 4':
//       case 'PS4':
//       case 'PlayStation 5':
//       case 'PS5':
//         return (
//           <img
//             src={playstationLogo}
//             alt={platform}
//             className='game_platform_logo'
//           />
//         );
//       case 'PlayStation Portable':
//       case 'PSP':
//         return (
//           <img src={pspLogo} alt={platform} className='game_platform_logo' />
//         );
//       case 'Vita':
//         return (
//           <img src={psVitaLogo} alt={platform} className='game_platform_logo' />
//         );
//       case 'Nintendo 64':
//       case 'N64':
//       case 'Nintendo 64DD':
//       case 'Nintendo Switch':
//       case 'Switch':
//         return (
//           <img
//             src={nintendoLogo}
//             alt={platform}
//             className='game_platform_logo'
//           />
//         );
//       case 'Nintendo DS':
//       case 'NDS':
//         return (
//           <img src={nintendoDs} alt={platform} className='game_platform_logo' />
//         );
//       case 'GBA':
//         return (
//           <img src={gbaLogo} alt={platform} className='game_platform_logo' />
//         );
//       case 'Nintendo 3DS':
//       case 'New Nintendo 3DS':
//       case '3DS':
//         return (
//           <img
//             src={nintendo3ds}
//             alt={platform}
//             className='game_platform_logo'
//           />
//         );
//       case 'Nintendo GameCube':
//       case 'NGC':
//         return (
//           <img
//             src={gamecubeLogo}
//             alt={platform}
//             className='game_platform_logo'
//           />
//         );
//       case 'Wii':
//         return (
//           <img src={wiiLogo} alt={platform} className='game_platform_logo' />
//         );
//       case 'Wii U':
//       case 'WiiU':
//         return (
//           <img src={wiiULogo} alt={platform} className='game_platform_logo' />
//         );
//       case 'SNES':
//         return (
//           <img src={snesLogo} alt={platform} className='game_platform_logo' />
//         );
//       case 'NES':
//         return (
//           <img src={nesLogo} alt={platform} className='game_platform_logo' />
//         );
//       case 'Xbox':
//       case 'XBOX':
//       case 'XONE':
//       case 'Xbox One':
//       case 'Xbox 360':
//       case 'X360':
//       case 'Series X':
//         return (
//           <img src={xboxLogo} alt={platform} className='game_platform_logo' />
//         );
//       case 'iOS':
//       case 'Mac':
//         return (
//           <img src={iosLogo} alt={platform} className='game_platform_logo' />
//         );
//       case 'Android':
//       case 'Linux':
//         return (
//           <img
//             src={androidLogo}
//             alt={platform}
//             className='game_platform_logo'
//           />
//         );
//       case 'SEGA':
//       case 'Dreamcast':
//         return (
//           <img src={segaLogo} alt={platform} className='game_platform_logo' />
//         );
//     }
//   };
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
