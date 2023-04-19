import React, { useEffect, useState } from 'react';
import './GamePreview.css';
import Tilt from 'react-parallax-tilt';

// PSP
import pspCase from '../../../assets/images/psp-case-front.png';
import pspCaseSide from '../../../assets/images/psp-case-side.png';
import pspBackCover from '../../../assets/images/psp-case-back.png';
// PlayStation 1
import ps1Case from '../../../assets/images/ps1-case-template.png';
import ps1CaseBack from '../../../assets/images/ps1-case-back.png';
import ps1CaseSide from '../../../assets/images/ps1-case-side.png';
// PlayStation 2
import ps2Case from '../../../assets/images/ps2-case-front.png';
import ps2SideBanner from '../../../assets/images/ps2-side-banner.png';
import ps2BackCover from '../../../assets/images/ps2-back-cover.png';
// PlayStation 3
import ps3SideBanner from '../../../assets/images/ps3-side.png';
import ps3BackCover from '../../../assets/images/ps3-back.png';
import ps3Case from '../../../assets/images/ps3-case-front.png';
// PlayStation 4
import ps4CaseBack from '../../../assets/images/ps4-case-back.png';
import ps4CaseSide from '../../../assets/images/ps4-case-side.png';
import ps4Case from '../../../assets/images/ps4-case.png';
// Nintendo 64
import nintendo64Case from '../../../assets/images/n64-case-template-e.png';
import nintendo64CaseSide from '../../../assets/images/n64-side-case.png';
import nintendo64CaseBack from '../../../assets/images/n64-case-back.png';
// Nintendo Switch
import nintendoSwitchCase from '../../../assets/images/switch-case.png';
import nintendoSwitchSide from '../../../assets/images/switch-side.png';
import nintendoSwitchBack from '../../../assets/images/switch-back.png';
// Gameboy Color
import gbcCase from '../../../assets/images/gbc-case.png';
import gbcCaseBack from '../../../assets/images/gbc-case-back.png';
// GameCube
import gamecubeBackCover from '../../../assets/images/gamecube-cover-back.png';
import gamecubeCaseSide from '../../../assets/images/gamecube-case-side.png';
import gamecubeCase from '../../../assets/images/gamecube-case.png';
// Nintendo DS/3DS
import nintendo3dsFront from '../../../assets/images/3ds-case-front.png';
// Wii
import wiiCase from '../../../assets/images/wii-case-front.png';
import wiiCaseBack from '../../../assets/images/wii-case-back.png';
import wiiCaseSide from '../../../assets/images/wii-case-side.png';
// Wii U
import wiiUCaseSide from '../../../assets/images/wiiu-case-side.png';
import wiiUCaseBack from '../../../assets/images/wiiu-case-back.png';
import wiiUCase from '../../../assets/images/wiiu-case-front.png';
// Xbox 360
import xbox360Side from '../../../assets/images/360-side1.png';
import xbox360Back from '../../../assets/images/360-back.png';
import xbox360Case from '../../../assets/images/x360-case-front.png';
// Xbox One X
import xbox1Side from '../../../assets/images/xbox1-case-side.png';
import xbox1Back from '../../../assets/images/xbox1-case-back.png';
import xbox1Case from '../../../assets/images/xbox1-case.png';
// Steam Logo
import steamCover from '../../../assets/images/steam-case-front.png';
import steamCaseSide from '../../../assets/images/steam-case-side.png';
import steamCaseBack from '../../../assets/images/steam-case-back.png';
// NES
import nesCaseSide from '../../../assets/images/nes-side-case.png';
import nesCaseFront from '../../../assets/images/nes-case-front.png';
import nesCaseBack from '../../../assets/images/nes-case-back.png';

import useProgressiveImage from '../../../hooks/useProgressiveImage';

const GamePreview = ({
  game,
  gameCover,
  ratingImage,
  viewingPreview,
  openGame,
  closeGame,
}) => {
  const bgLoaded = useProgressiveImage(gameCover);
  const [viewBackCover, setViewBackCover] = useState(false);

  const grabGamePlatformId = () => {
    // Ids of arcdade platforms to be excluded
    const arcadeIds = [52, 55, 71, 77, 99, 129, 152, 374, 149];

    // Try to find first platform it was released on
    const gamePlatformIds = game.release_dates.sort(function (a, b) {
      return a.date - b.date;
    });

    console.log(gamePlatformIds);

    if (gamePlatformIds.length == 1) {
      return gamePlatformIds[0].platform;
    }

    for (let gamePlatform of gamePlatformIds) {
      if (arcadeIds.includes(gamePlatform.platform)) continue;
      else return gamePlatform.platform;
    }
  };

  const gamePlatform = game.platforms.filter(
    (platform) => platform.id == grabGamePlatformId()
  )[0];
  console.log(gamePlatform);

  useEffect(() => {
    closeGame();
  }, [game.id]);

  // Return the image of the side of a typical game case based on game platform
  const determineSideBanner = () => {
    switch (gamePlatform.abbreviation) {
      case 'X360':
        return xbox360Side;
      case 'XONE':
        return xbox1Side;
      case 'NGC':
        return gamecubeCaseSide;
      case 'PSP':
        return pspCaseSide;
      case 'PS1':
        return ps1CaseSide;
      case 'PS2':
        return ps2SideBanner;
      case 'PS3':
        return ps3SideBanner;
      case 'PS4':
        return ps4CaseSide;
      case 'Switch':
        return nintendoSwitchSide;
      case 'N64':
        return nintendo64CaseSide;
      case 'Wii':
        return wiiCaseSide;
      case 'WiiU':
        return wiiUCaseSide;
      case 'NES':
      case 'fds':
        return nesCaseSide;
      case 'PC':
        return steamCaseSide;
      default:
        return '';
    }
  };

  const determineBackCover = () => {
    switch (gamePlatform.abbreviation) {
      case 'Game Boy':
        return gbcCaseBack;
      case 'NGC':
        return gamecubeBackCover;
      case 'PSP':
        return pspBackCover;
      case 'PS1':
        return ps1CaseBack;
      case 'PS2':
        return ps2BackCover;
      case 'PS3':
        return ps3BackCover;
      case 'PS4':
        return ps4CaseBack;
      case 'Switch':
        return nintendoSwitchBack;
      case 'X360':
        return xbox360Back;
      case 'XONE':
        return xbox1Back;
      case 'Wii':
        return wiiCaseBack;
      case 'WiiU':
        return wiiUCaseBack;
      case 'PC':
        return steamCaseBack;
      case 'NES':
        return nesCaseBack;
      case 'N64':
        return nintendo64CaseBack;
      default:
        return null;
    }
  };

  // Based on the game platform, adjust the colors to reflect the platform/console color scheme
  const determineCoverColor = () => {
    if (!gamePlatform) return;

    switch (gamePlatform.abbreviation) {
      case 'DC':
      case 'PS1':
      case 'PS2':
      case 'PSP':
      case 'NES':
      case 'fds':
        return '#000000';
      case 'PS3':
        return '#383838';
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
      case 'XONE':
      case 'XBOX':
      case 'Series X':
        return '#107C10';
      case 'X360':
        return '#5dc21e';
      case 'PC':
        return '#c0c0c0';
      default:
        return '#172d3e';
    }
  };

  if (!bgLoaded) return;

  return (
    <div className='game_preview__wrapper' onClick={() => console.log(game)}>
      <Tilt
        tiltEnable={!viewingPreview}
        glareEnable={true}
        tiltMaxAngleX={30}
        tiltMaxAngleY={35}
        perspective={1000}
        glarePosition={'all'}
        glareBorderRadius={viewBackCover ? '4px 0 0 4px' : '0 4px 4px 0'}
        transitionEasing={'cubic-bezier(.03,.98,.52,.99)'}
        glareMaxOpacity={'.35'}
        glareColor={'rgba(255,255,255, 1)'}
        style={{
          height: 386,
          width: 250,
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
        }}
      >
        <div
          className={`game_preview__box ${viewingPreview && 'box_open'} ${
            viewBackCover && 'viewing_back'
          }`}
          onClick={() => setViewBackCover(!viewBackCover)}
        >
          {/* FRONT SIDE OF CASE */}
          <div
            className={`game_preview__front 
            ${gamePlatform.abbreviation == 'Switch' && 'switch_case'} 
            ${gamePlatform.abbreviation == 'PC' && 'pc_case'} 
            ${viewingPreview && 'game_preview__front_open'}
            ${gamePlatform.abbreviation == 'NES' && 'nes_case'}
    `}
            style={{
              backgroundImage: `url(${bgLoaded})`,
              height: `${
                gamePlatform.abbreviation == 'PS1'
                  ? '368px'
                  : gamePlatform.abbreviation == 'N64'
                  ? '368px'
                  : ''
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
            {gamePlatform.abbreviation == 'PSP' && (
              <img src={pspCase} className='psp_game_img' />
            )}
            {gamePlatform.abbreviation == 'Game Boy' && (
              <img src={gbcCase} className='ps1_game_img' />
            )}
            {gamePlatform.abbreviation == 'PS1' && (
              <img src={ps1Case} className='ps1_game_img' />
            )}
            {gamePlatform.abbreviation == 'PS2' && (
              <img src={ps2Case} className='ps2_game_img' />
            )}
            {gamePlatform.abbreviation == 'PS3' && (
              <img src={ps3Case} className='ps3_game_img' />
            )}
            {gamePlatform.abbreviation == 'PS4' && (
              <img src={ps4Case} className='ps3_game_img' />
            )}
            {gamePlatform.abbreviation == 'X360' && (
              <img src={xbox360Case} className='xbox-360_game_img' />
            )}
            {gamePlatform.abbreviation == 'Switch' && (
              <img
                src={nintendoSwitchCase}
                style={{ top: '0px' }}
                className='xbox-360_game_img'
              />
            )}
            {gamePlatform.abbreviation == 'XONE' && (
              <img src={xbox1Case} className='xbox-360_game_img' />
            )}
            {gamePlatform.abbreviation == '3DS' && (
              <img src={nintendo3dsFront} className='nintendo-3ds_game_img' />
            )}
            {gamePlatform.abbreviation == 'Wii' && (
              <img src={wiiCase} className='wii_game_img' />
            )}
            {gamePlatform.abbreviation == 'WiiU' && (
              <img src={wiiUCase} className='wii_game_img' />
            )}
            {gamePlatform.abbreviation == 'PC' && (
              <img src={steamCover} className='steam_game_img' />
            )}
            {gamePlatform.abbreviation == 'NES' && (
              <img src={nesCaseFront} className='nes_game_img' />
            )}
            {gamePlatform.abbreviation == 'NGC' && (
              <img src={gamecubeCase} className='nes_game_img' />
            )}

            {/* FRONT CASE COVER BANNER */}

            {gamePlatform.abbreviation !== 'PS1' && ratingImage}
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
              </div>
            </div>
          )}

          {/* MIDDLE CREASE */}
          <div
            className={`game_preview__middle ${
              gamePlatform.abbreviation == 'Switch' && 'switch_middle'
            } ${viewingPreview && 'middle_open'}`}
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
            ${gamePlatform.abbreviation == 'N64' && 'n64_back'}


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
                  : '7px'
              }`,
              borderBottom: `${determineCoverColor()} solid 4px`,
              borderLeft: `${determineCoverColor()} solid 7px`,
              borderRight: `${determineCoverColor()} solid 3px`,
            }}
          >
            <img
              src={determineBackCover()}
              className={`game_preview__back_cover ${
                gamePlatform.abbreviation == 'PS2' && 'ps2_back_cover'
              }`}
            />
          </div>

          {/* LEFT SIDE OF CASE */}
          <div
            className={`game_preview__left ${viewingPreview && 'left_open'}  ${
              viewingPreview &&
              gamePlatform.abbreviation == 'Switch' &&
              'switch_case_left'
            }`}
            style={{
              '--color-theme':
                gamePlatform.abbreviation == 'X360'
                  ? '#FFF'
                  : determineCoverColor(),
              background:
                determineSideBanner() !== '' && `url(${determineSideBanner()})`,
              backgroundPosition: '50% 100%',
              backgroundSize: '100% 100%',
              borderTop:
                gamePlatform.abbreviation == 'X360' && '4px solid #5dc21e',
              height:
                gamePlatform.abbreviation == 'X360' &&
                !viewingPreview &&
                '372px',
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
            style={{
              '--color-theme': determineCoverColor(),
              background: determineCoverColor(),
            }}
          />
        </div>
      </Tilt>
    </div>
  );
};

export default GamePreview;
