import React, { useState, useEffect } from 'react';
import './UserCollection.css';
import { FaSistrix, FaHome, FaStar } from 'react-icons/fa';
import { CiSquareMore } from 'react-icons/ci';
import { read, utils, writeFile } from 'xlsx';
import axios from 'axios';

import UserGame from '../UserGame/UserGame';
import useContextMenu from '../../hooks/useContextMenu';
import bronzeTrophy from '../../assets/images/ps-trophy-bronze.png';
import goldTrophy from '../../assets/images/ps-trophy-gold.png';
import platinumTrophy from '../../assets/images/ps-trophy-platinum.png';

const UserCollection = ({
  collection,
  activeProfile,
  backToHome,
  playTrack,
  currentTrack,
  isPlaying,
  pausePlayback,
  resumePlayback,
  spotifyToken,
  setSelectedProfile,
  removeGame,
  updateCollection,
  userNotes,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [viewingList, setViewingList] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [currentlyAdjusting, setCurrentlyAdjusting] = useState(null);
  const [viewingCSVDropdown, setViewingCSVDropdown] = useState(false);
  // SPOTLIGHT STATES
  const [spotlightList, setSpotlightList] = useState([]);
  const [spotlightFilter, setSpotlightFilter] = useState('playtime');
  // COVER LIST STATES
  const [listFilter, setListFilter] = useState('alphabetical');
  const [filteredList, setFilteredList] = useState([]);
  // STATUS LIST STATES
  const [statusFilter, setStatusFilter] = useState('backlog');

  const baseURL = process.env.REACT_APP_BASE_URL;
  const { anchorPoint, showTitleMenu } = useContextMenu();
  const trophies = [platinumTrophy, goldTrophy, bronzeTrophy];

  // If user is typing, filter titles that reflect inputted value
  useEffect(() => {
    if (searchValue == '') {
      setSearchList([]);
      return;
    }
    const delaySearch = setTimeout(() => {
      const res = collection.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setSearchList(res);
    }, 250);

    return () => clearTimeout(delaySearch);
  }, [searchValue]);

  // Listen for screen size to determine if user is on mobile
  useEffect(() => {
    if (window.innerWidth <= 600) {
      setIsMobile(true);
    }
    function handleResize() {
      if (window.innerWidth <= 600) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Listen for spotlight filter change
  useEffect(() => {
    if (spotlightFilter == 'playtime') {
      setSpotlightList(
        [...collection].sort((a, b) => b[spotlightFilter] - a[spotlightFilter])
      );
    } else if (spotlightFilter == 'user_rating') {
      setSpotlightList(
        collection
          .filter((game) => game.user_rating)
          .sort((a, b) => b['user_rating'] - a['user_rating'])
      );
    } else {
      setSpotlightList(
        collection
          .filter((game) => game.achievements)
          .sort((a, b) => b['achievements'] - a['achievements'])
      );
    }
  }, [spotlightFilter, collection]);

  // Listen for list filter change
  useEffect(() => {
    if (listFilter == 'achievements') {
      setFilteredList(
        [...collection]
          .filter((game) => game.achievements)
          .sort((a, b) => b['achievements'] - a['achievements'])
      );
    } else if (listFilter == 'playtime') {
      setFilteredList(
        [...collection]
          .filter((game) => game.playtime > 0)
          .sort((a, b) => b.playtime - a.playtime)
      );
    } else if (listFilter == 'status') {
      setFilteredList(
        [...collection].filter(
          (game) => game.status == statusFilter.toUpperCase()
        )
      );
    } else if (listFilter == 'rating') {
      setFilteredList(
        [...collection]
          .filter((game) => game.user_rating)
          .sort((a, b) => b.user_rating - a.user_rating)
      );
    } else if (listFilter == 'trophies') {
      // const earnedTrophyCount = game.trophies.filter((game) => game.earned);
      setFilteredList(
        [...collection]
          .filter((game) => game.trophies)
          .sort((a, b) => a.trophies - b.trophies)
      );
    } else {
      setFilteredList(
        [...collection].sort((a, b) =>
          a.name.toUpperCase() > b.name.toUpperCase()
            ? 1
            : a.name.toUpperCase() < b.name.toUpperCase()
            ? -1
            : 0
        )
      );
    }
  }, [listFilter, statusFilter]);

  // Select which game is being viewed
  const viewGameHandler = (game) => {
    setCurrentGame(game);
  };

  // Open up the menu when the user right clicks
  const viewGameHeaders = (e, game) => {
    e.preventDefault();
    setCurrentlyAdjusting(game);
  };

  // Determine what stat to show based on current filter
  const getFilterStat = (game) => {
    switch (listFilter) {
      case 'playtime':
        if (Math.floor(game.playtime / 60) >= 1) {
          return (
            <span className='filter_stat'>
              {Math.floor(game.playtime / 60)}{' '}
              {Math.floor(game.playtime / 60) == 1 ? 'hour' : 'hours'}
            </span>
          );
        } else {
          return (
            <span className='filter_stat'>
              {game.playtime} {game.playtime == 1 ? 'minute' : 'minutes'}
            </span>
          );
        }
      case 'rating':
        return (
          <span className='filter_stat rating_stat'>{game.user_rating}%</span>
        );
      case 'trophies':
        if (!game.trophies) break;
        const earnedTrophyCount = game?.trophies?.filter((game) => game.earned);
        return (
          <span className='filter_stat'>
            {Math.floor(
              (earnedTrophyCount.length / game.trophies.length) * 100
            )}
            % earned
          </span>
        );
      default:
        break;
    }
  };

  const removeGameHandler = (e) => {
    e.stopPropagation();
    if (
      Object.keys(currentGame).length > 0 &&
      currentlyAdjusting.id === currentGame.id
    )
      setCurrentGame(null);
    removeGame(currentlyAdjusting);
    setCurrentlyAdjusting(null);
  };

  const importUserCollection = async (collection) => {
    try {
      const request = await axios.put(
        `${baseURL}/app/add_imported_collection`,
        {
          email: localStorage.getItem('user'),
          profile: localStorage.getItem('profile'),
          collection,
        }
      );
      console.log(request);
    } catch (error) {
      console.log(error);
    }
  };

  // Allow user to import their own collection via CSV file
  const handleImport = ($event) => {
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          setFilteredList(rows);
          importUserCollection(rows);
        }
      };
      reader.readAsArrayBuffer(file);
    }
    setViewingCSVDropdown(false);
  };

  // Allow user to export their collection from their own file
  const handleExport = () => {
    const headings = [
      [
        'name',
        'id',
        'cover_image',
        'playtime',
        'origin',
        'status',
        'user_rating',
        'banner_image',
      ],
    ];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, filteredList, { origin: 'A2', skipHeader: true });
    utils.book_append_sheet(wb, ws, 'Game');
    writeFile(wb, 'Game Collection.xlsx');
    setViewingCSVDropdown(false);
  };

  // HTML RENDER
  return (
    <div className='user_collection__wrapper'>
      <div
        className='user_collection__container'
        style={{
          background: '#111',
        }}
      >
        {/* LEFT SIDE */}
        <div
          className='user_collection__left'
          style={{
            height: viewingList && '250%',
            marginBottom: viewingList && '25px',
            display: isMobile && currentGame && 'none',
          }}
        >
          <div className='user_collection__left_header'>
            <h2>
              <img
                style={{
                  height: '50px',
                  width: '50px',
                  borderRadius: '4px',
                }}
                src={activeProfile.avatar}
              />
              {activeProfile.name.trim()}'s Collection
              <CiSquareMore
                className='user_collection__upload_icon'
                onClick={() => setViewingCSVDropdown(!viewingCSVDropdown)}
              />
              {viewingCSVDropdown && (
                <div>
                  <ul className='upload_dropdown_list'>
                    <li>
                      {' '}
                      <input
                        style={{ display: 'none' }}
                        type='file'
                        name='file'
                        className='custom-file-input'
                        id='inputGroupFile'
                        required
                        onChange={handleImport}
                        accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
                      />
                      <label
                        className='custom-file-label'
                        htmlFor='inputGroupFile'
                      >
                        Import CSV
                      </label>
                    </li>
                    <li onClick={handleExport}>Export CSV</li>
                  </ul>
                </div>
              )}
              <FaHome
                className='user_collection__home_icon'
                onClick={backToHome}
              />
            </h2>

            <div className='user_collection__search'>
              <FaSistrix className='user_collection__search_icon' />
              <input
                className='user_collection__search_input'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>

          <ul
            className='user_collection__title_list'
            style={{
              height: viewingList && '100%',
              display: viewingList && 'flex',
            }}
          >
            <p
              className='user_collection__total'
              style={{
                color: 'white',
                paddingLeft: '7px',
                marginBottom: '5px',
                position: 'fixed',
                top: '132px',
                left: '1px',
                fontSize: '.95rem',
                width: '100%',
                height: '22px',
                background:
                  'linear-gradient(to right, rgba(25,25,25,.5) 0%,rgba(17,17,17,1) 46%,rgba(1,1,1,1) 50%,rgba(10,10,10,1) 53%,rgba(78,78,78,1) 76%,rgba(56,56,56,1) 87%,rgba(27,27,27,1) 100%)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {searchList.length <= 0 && searchValue == '' ? 'All' : 'Results'}{' '}
              (
              <span style={{ fontSize: '.75rem' }}>
                {searchValue == '' ? collection.length : searchList.length}
              </span>
              )
            </p>

            {searchValue == '' ? (
              collection
                .sort((a, b) =>
                  a.name.toUpperCase() > b.name.toUpperCase()
                    ? 1
                    : a.name.toUpperCase() < b.name.toUpperCase()
                    ? -1
                    : 0
                )
                .map((game) => (
                  <li
                    className='title_list__item'
                    key={game.id}
                    onClick={() => viewGameHandler(game)}
                    onContextMenu={(e) => viewGameHeaders(e, game)}
                    style={{
                      background: currentGame?.id == game.id && '#9147ff',
                      color: currentGame?.id == game.id && 'white',
                    }}
                  >
                    {' '}
                    <img src={game.cover_image} />
                    <p>{game.name}</p>
                    {game.name == activeProfile.favorite_game && (
                      <FaStar className='list_item_favorite' />
                    )}
                    {showTitleMenu && (
                      <ul
                        onMouseEnter={(e) => e.stopPropagation(true)}
                        className='user_collection__game_context'
                        style={{
                          top: anchorPoint.y,
                          left: anchorPoint.x,
                          zIndex: 6,
                        }}
                      >
                        <li className='banner_context__item'>
                          Add to Favorites
                        </li>
                        <li
                          className='banner_context__item'
                          onClick={(e) => removeGameHandler(e, game)}
                        >
                          Delete Game
                        </li>
                      </ul>
                    )}
                  </li>
                ))
            ) : searchList.length > 0 && searchValue != '' ? (
              searchList.map((game) => (
                <li
                  className='title_list__item'
                  key={game.id}
                  onClick={() => viewGameHandler(game)}
                >
                  {' '}
                  <img src={game.cover_image} />
                  <p>{game.name}</p>
                </li>
              ))
            ) : (
              <p
                style={{
                  color: 'white',
                  fontSize: '3.2rem',
                  position: 'absolute',
                  top: '44%',
                  left: '16px',
                }}
              >
                No Matches
              </p>
            )}
            <div className='user_collection__title_list_shadow' />
            <div className='user_collection__title_list_shadow top_shadow' />
          </ul>
          <div className='user_collection__actions'>
            <button className='persona_font' onClick={backToHome}>
              Back
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className='user_collection__right'>
          {currentGame !== null && (
            <>
              <UserGame
                game={currentGame}
                activeProfile={activeProfile}
                closeStats={() => setCurrentGame(null)}
                setCurrentGame={(game) => setCurrentGame(game)}
                updateCollection={updateCollection}
                userNotes={userNotes}
              />
            </>
          )}

          {!currentGame && (
            // SPOTLIGHT
            <>
              {!isMobile && (
                <div className='user_collection__spotlight_wrapper'>
                  <div className='spotlight_filters'>
                    {/* MOST PLAYED, HIGHEST RATED, MOST ACHIEVEMENTS */}
                    <h2 className='spotlight_filter'>
                      {spotlightFilter == 'playtime'
                        ? 'Most Played'
                        : spotlightFilter == 'user_rating'
                        ? 'Highest Rated'
                        : 'Most Achievements'}{' '}
                    </h2>
                    <ul className='spotlight_filter__options'>
                      <li
                        onClick={() => setSpotlightFilter('playtime')}
                        style={{
                          color: spotlightFilter == 'playtime' && 'white',
                        }}
                      >
                        Most Played
                      </li>
                      <li
                        onClick={() => setSpotlightFilter('user_rating')}
                        style={{
                          color: spotlightFilter == 'user_rating' && 'white',
                        }}
                      >
                        Highest Rated
                      </li>
                      <li
                        onClick={() => setSpotlightFilter('achievements')}
                        style={{
                          color: spotlightFilter == 'achievements' && 'white',
                        }}
                      >
                        Most Achievements
                      </li>
                    </ul>
                  </div>
                  <div className='user_collection__spotlight'>
                    {spotlightList.slice(0, 3).map((top, i) => (
                      <figure
                        key={top.id}
                        className='spotlight_container'
                        onClick={() => viewGameHandler(top)}
                      >
                        <img
                          className='spotlight_image'
                          src={top.banner_url || top.cover_image}
                        />
                        <div className='spotlight_container__row'>
                          <img
                            className='spotlight_trophy_image'
                            src={trophies[i]}
                          />
                          <figcaption className='spotlight_details'>
                            <p>
                              {spotlightFilter == 'playtime'
                                ? `${Math.floor(top.playtime / 60)} hours`
                                : spotlightFilter == 'user_rating'
                                ? top.user_rating + '%'
                                : 'ACHIEVE'}{' '}
                            </p>
                          </figcaption>
                        </div>
                      </figure>
                    ))}
                  </div>
                </div>
              )}

              {/* COVER LIST */}
              <div className='user_collection__list_container'>
                <div className='user_collection__list_filters'>
                  <p style={{ marginBottom: '2px', fontSize: '1.5rem' }}>
                    {listFilter == 'alphabetical'
                      ? 'All Games'
                      : listFilter == 'achievements'
                      ? 'Achievements'
                      : listFilter == 'playtime'
                      ? 'Playtime'
                      : listFilter == 'rating'
                      ? 'Rating'
                      : listFilter == 'status'
                      ? 'Status'
                      : 'Trophies'}
                  </p>
                  <ul className='user_collection__list_filters__list'>
                    <li
                      style={{ color: listFilter == 'alphabetical' && 'white' }}
                      onClick={() => setListFilter('alphabetical')}
                    >
                      All
                    </li>
                    <span> | </span>
                    <li
                      style={{ color: listFilter == 'achievements' && 'white' }}
                      onClick={() => setListFilter('achievements')}
                    >
                      Achievements
                    </li>
                    <span> | </span>

                    <li
                      style={{ color: listFilter == 'playtime' && 'white' }}
                      onClick={() => setListFilter('playtime')}
                    >
                      Playtime
                    </li>
                    <span> | </span>

                    <li
                      style={{ color: listFilter == 'rating' && 'white' }}
                      onClick={() => setListFilter('rating')}
                    >
                      Rating
                    </li>
                    <span> | </span>

                    <li
                      style={{ color: listFilter == 'status' && 'white' }}
                      onClick={() => {
                        setListFilter('status');
                        setStatusFilter('backlog');
                      }}
                    >
                      Status
                    </li>
                    <span> | </span>

                    <li
                      style={{ color: listFilter == 'trophies' && 'white' }}
                      onClick={() => setListFilter('trophies')}
                    >
                      Trophies
                    </li>
                  </ul>
                  {listFilter == 'status' && (
                    <div
                      className='user_collection__list_filters__list'
                      style={{ margin: '0' }}
                    >
                      <ul
                        className='user_collection__list_filters__list_status'
                        style={{ flexDirection: 'row' }}
                      >
                        <li
                          style={{
                            color: statusFilter == 'backlog' && 'white',
                          }}
                          onClick={() => setStatusFilter('backlog')}
                        >
                          Backlog
                        </li>
                        <span> | </span>
                        <li
                          style={{
                            color: statusFilter == 'started' && 'white',
                          }}
                          onClick={() => setStatusFilter('started')}
                        >
                          Started
                        </li>
                        <span> | </span>
                        <li
                          style={{
                            color: statusFilter == 'playing' && 'white',
                          }}
                          onClick={() => setStatusFilter('playing')}
                        >
                          Playing
                        </li>
                        <span> | </span>
                        <li
                          style={{
                            color: statusFilter == 'finished' && 'white',
                          }}
                          onClick={() => setStatusFilter('finished')}
                        >
                          Finished
                        </li>
                        <span> | </span>
                        <li
                          style={{
                            color: statusFilter == '100%' && 'white',
                          }}
                          onClick={() => setStatusFilter('100%')}
                        >
                          100%
                        </li>
                        <span> | </span>
                        <li
                          style={{
                            color: statusFilter == 'abandonded' && 'white',
                          }}
                          onClick={() => setStatusFilter('abandonded')}
                        >
                          Abandonded
                        </li>
                        <span> | </span>
                        <li
                          style={{
                            color: statusFilter == 'not owned' && 'white',
                          }}
                          onClick={() => setStatusFilter('not owned')}
                        >
                          Not Owned
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <ul className='user_collection__list'>
                  {!isMobile || (isMobile && searchValue == '')
                    ? filteredList.map((game) => (
                        <li
                          className='list_item'
                          key={game.id}
                          onClick={() => viewGameHandler(game)}
                        >
                          <div className='user_collection__poster_container'>
                            <div className='gradient' />
                            <>
                              {/* FRONT OF POSTER */}
                              <div className='user_collection__poster_front'>
                                <img
                                  loading='lazy'
                                  className='user_collection__poster'
                                  src={game.cover_image}
                                  alt={game.name}
                                />
                              </div>
                            </>
                          </div>
                          {getFilterStat(game)}
                        </li>
                      ))
                    : searchList.map((game) => (
                        <li
                          className='list_item'
                          key={game.id}
                          onClick={() => viewGameHandler(game)}
                        >
                          <div className='user_collection__poster_container'>
                            <div className='gradient' />
                            <>
                              {/* FRONT OF POSTER */}
                              <div className='user_collection__poster_front'>
                                <img
                                  loading='lazy'
                                  className='user_collection__poster'
                                  src={
                                    isMobile
                                      ? game.cover_image.replace(
                                          'cover_big',
                                          '1080p'
                                        )
                                      : game.cover_image
                                  }
                                  alt={game.name}
                                />
                              </div>
                            </>
                          </div>
                        </li>
                      ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCollection;
