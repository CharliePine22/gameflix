import React, { useState, useEffect } from 'react';
import './UserGame.css';
import axios from 'axios';
import { FiClock } from 'react-icons/fi';
import { FaMedal, FaMusic, FaAngleDown } from 'react-icons/fa';
import useContextMenu from '../../hooks/useContextMenu';
import UserGameNotes from './UserNotes';
import SpotifyPlayback from '../SpotifyPlayback/SpotifyPlayback';

const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();
if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;
const formattedToday = mm + '/' + dd + '/' + yyyy;

const UserGame = ({
  game,
  activeProfile,
  closeStats,
  setCurrentGame,
  updateCollection,
  userNotes,
  spotifyToken,
  currentTrack,
  playAudio,
  pausePlayback,
  beginPlayback,
  playTrack,
}) => {
  // RATING, PLAYTIME, ACHIEVEMENTS, SPOTIFY, NOTES, STATUS(COMPLETED, BACKLOG, ETC.), PLATFORMS OWNED
  const { anchorPoint, showBannerMenu, resetContext } = useContextMenu();
  // Achievement States
  const [viewStatus, setViewStatus] = useState({
    achievements: true,
    notes: true,
    trophies: true,
  });
  const [achievements, setAchievements] = useState(game.achievements);
  const [trophies, setTrophies] = useState(game.trophies);
  const [achievementFilter, setAchievementFilter] = useState('unlocked');
  const [trophyFilter, setTrophyFilter] = useState('unlocked');
  const [currentGameNotes, setCurrentGameNotes] = useState(null);
  // Playtime States
  const [playtime, setPlaytime] = useState(Math.floor(game.playtime / 60));
  const [changingPlaytime, setChangingPlaytime] = useState(false);
  // Rating States
  const [rating, setRating] = useState(game.user_rating);
  const [changingRating, setChangingRating] = useState(false);
  const [changingBanner, setChangingBanner] = useState(false);
  const [bannerLink, setBannerLink] = useState('');
  const [viewingSoundtrack, setViewingSoundtrack] = useState(false);
  const [gameOST, setGameOST] = useState([]);

  // BACKLOG, CURRENTLY PLAYING, COMPLETED, STARTED, ABAND ONED, 100%, NOT OWNED
  const [backlogStatus, setBacklogStatus] = useState(game.status);
  const [changingBacklog, setChangingBacklog] = useState(false);
  // Hooks and Storage Variables
  const baseURL = process.env.REACT_APP_BASE_URL;
  const steamID = localStorage.getItem('steamID');
  const userEmail = localStorage.getItem('user');
  const trophyPercentage = Math.floor(
    (trophies?.filter((game) => game.earned == true).length /
      trophies?.length) *
      100
  );

  const achievementPercentage = Math.floor(
    (achievements?.filter(
      (game) => game.achieved == true || game.earned == true
    ).length /
      achievements?.length) *
      100
  );

  const updateProfileNotes = async () => {
    const currentGame = userNotes.notes_collection.filter(
      (g) => g.id == game.id
    )[0];

    if (!currentGame) return;

    const request = await axios.put(`${baseURL}/notes/update_notes`, {
      profile: activeProfile,
      gameId: currentGame.id,
      notes: currentGame,
      email: userEmail,
    });

    setCurrentGameNotes(
      userNotes.notes_collection.filter((g) => g.id == game.id)[0]
    );

    return request;
  };

  const selectTrackHandler = (e, track) => {
    e.stopPropagation();
    if (currentTrack !== null && track.name == currentTrack.name) {
      beginPlayback();
    }
    playTrack(track);
  };

  const createNewGameNote = () => {
    // If user has no notes for any other games, create an empty array
    if (userNotes.notes_collection.length == 0) {
      userNotes.notes_collection = [
        {
          id: game.id,
          name: game.name,
          tabs: [
            {
              tabName: 'Notes',
              notes: [
                {
                  id: 0,
                  note: `These are your notes for ${game.name}! Click me to edit this or start your own tab by clicking the +`,
                  date: formattedToday,
                },
              ],
            },
          ],
        },
      ];

      setCurrentGameNotes({
        id: game.id,
        name: game.name,
        tabs: [
          {
            tabName: 'Notes',
            notes: [
              {
                id: 0,
                note: `These are your notes for ${game.name}! Click me to edit this or start your own tab by clicking the +`,
                date: formattedToday,
              },
            ],
          },
        ],
      });
    }
    // If user has notes for others game, simply update the array
    else {
      userNotes.notes_collection.push({
        id: game.id,
        name: game.name,
        tabs: [
          {
            tabName: 'Notes',
            notes: [
              {
                id: 0,
                note: `These are your notes for ${game.name}! Click me to edit this or start your own tab by clicking the +`,
                date: formattedToday,
              },
            ],
          },
        ],
      });
      setCurrentGameNotes({
        id: game.id,
        name: game.name,
        tabs: [
          {
            tabName: 'Notes',
            notes: [
              {
                id: 0,
                note: `These are your notes for ${game.name}! Click me to edit this or start your own tab by clicking the +`,
                date: formattedToday,
              },
            ],
          },
        ],
      });
    }

    updateProfileNotes();
  };

  useEffect(() => {
    if (
      !userNotes.notes_collection ||
      userNotes.notes_collection.filter((g) => g.id == game.id).length == 0
    )
      createNewGameNote();
    else {
      setCurrentGameNotes(
        userNotes.notes_collection.filter((g) => g.id == game.id)[0]
      );
    }
  }, [game, userNotes]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setChangingRating(false);
        setChangingBacklog(false);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Runs everytime game changes
  useEffect(() => {
    setViewingSoundtrack(false);
    setChangingPlaytime(false);
    setChangingRating(false);
    setChangingBacklog(false);
    setBacklogStatus(game.status || 'BACKLOG');
    setPlaytime(Math.floor(game.playtime / 60));
    setRating(game.user_rating);
    setAchievements(game.achievements);
    setTrophies(game.trophies);
    console.log(game);
    if (!steamID) {
      console.log('No steam id');
      return;
    }

    // Compare both achievement lists to get Icons
    const getAchievementData = (arr1, arr2) => {
      let dataList = [];
      arr2.map(function (x) {
        var result = arr1.filter((a1) => a1.name == x.displayName);
        if (result.length > 0) {
          x.achieved = result[0].achieved;
        }
        dataList.push(x);
      });

      // Sort Alphabetically
      dataList.sort(function (a, b) {
        var textA = a.displayName.toUpperCase();
        var textB = b.displayName.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });

      dataList.sort(function (a, b) {
        return a.achieved < b.achieved ? 1 : a.achieved > b.achieved ? -1 : 0;
      });
      return dataList;
    };

    // Sort by unlocked Achievements
    const fetchAppData = async () => {
      const steamGameStats = await axios.get(
        `${baseURL}/steam/get_game_stats`,
        {
          params: {
            gameId: game.id,
          },
        }
      );
      if (Object.keys(steamGameStats.data).length == 0) {
        setAchievements(null);
        return;
      }
      try {
        if (!game.achievements) {
          const request = await axios.get(
            `${baseURL}/steam/get_steam_achievements`,
            {
              params: {
                gameId: game.id,
                steamId: steamID,
              },
            }
          );

          const userAchievementData = getAchievementData(
            request.data.achievements,
            steamGameStats.data.availableGameStats.achievements
          );

          const addAchievements = await axios.put(
            `${baseURL}/app/update_game_achievements`,
            {
              email: userEmail,
              currentProfile: activeProfile.name,
              achievements: userAchievementData,
              gameId: game.id,
            }
          );

          setCurrentGame(request.data.response.game);
          updateCollection(request.data.response.profile.collection);
          setAchievements(addAchievements.data.response.game.achievements);
        }
      } catch (error) {
        console.log(error);
        return error;
      }
    };
    fetchAppData();
  }, [game]);

  const getAchievementCount = (list) => {
    if (!list) return 'N/A';
    const numberAchieved = list.filter(
      (game) => game.achieved == true || game.earned == true
    ).length;
    return numberAchieved + '/' + list.length;
  };

  const getSpotifyAlbum = async () => {
    if (!spotifyToken) return null;
    else {
      try {
        const request = await axios.get(`${baseURL}/spotify/spotify_album`, {
          params: {
            game: game.name,
            token: spotifyToken,
            baseURL,
          },
        });
        if (request.data.status !== 'OK') {
          console.log(request);
          return;
        } else {
          setGameOST(request.data.tracks);
          setViewingSoundtrack(true);
          return;
        }
      } catch (error) {
        console.log(error);
        return error;

        return error;
      }
    }
  };

  // Convert steam minutes to numbers
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function toHoursAndMinutes(totalMinutes) {
    if (totalMinutes <= 0 && game.type == 'steam') return 'Not Started';
    else if (totalMinutes <= 0 && game.type !== 'steam') return 0 + ' hours';
    else {
      const minutes = totalMinutes % 60;
      const hours = Math.floor(totalMinutes / 60);
      if (minutes == 0) return hours + ' hours';
      return `${hours}.${padTo2Digits(minutes)} hours`;
    }
  }

  const updateRatingHandler = async () => {
    try {
      const request = await axios.put(`${baseURL}/app/update_game_rating`, {
        email: userEmail,
        currentProfile: activeProfile.name,
        rating: rating,
        gameId: game.id,
      });
      localStorage.setItem('profile', request.data.response.profile.name);
      setCurrentGame(request.data.response.game);
      updateCollection(request.data.response.profile.collection);
      setChangingRating(false);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const updatePlaytime = async () => {
    if (game.playtime == playtime) {
      return;
    } else {
      try {
        const request = await axios.put(`${baseURL}/app/update_game_playtime`, {
          email: userEmail,
          currentProfile: activeProfile.name,
          playtime: playtime * 60,
          gameId: game.id,
        });

        localStorage.setItem('profile', request.data.response.profile.name);
        setCurrentGame(request.data.response.game);
        updateCollection(request.data.response.profile.collection);
        setChangingPlaytime(false);
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  };

  const updateBacklog = async (status) => {
    try {
      const request = await axios.put(`${baseURL}/app/update_game_backlog`, {
        email: userEmail,
        currentProfile: activeProfile.name,
        status: status,
        gameId: game.id,
      });

      localStorage.setItem('profile', request.data.response.profile.name);

      setCurrentGame(request.data.response.game);
      updateCollection(request.data.response.profile.collection);
      setChangingBacklog(false);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const updateBacklogHandler = (status) => {
    updateBacklog(status);
    setChangingBacklog(false);
  };

  // Minimzie or Maximize Height of Game Component
  const windowViewHandler = (data) => {
    setViewStatus({ ...viewStatus, [data]: !viewStatus[data] });
  };

  // Determine if user is updating or canceling playtime change
  const determinePlaytimeAction = (e) => {
    if (e.key === 'Enter') {
      updatePlaytime();
    }
    if (e.key === 'Escape') {
      setChangingPlaytime(false);
      setPlaytime(Math.floor(game.playtime / 60));
    }
  };

  // Determine if user is updating or canceling playtime change
  const determineRatingAction = (e) => {
    if (e.key === 'Enter') {
      updateRatingHandler();
    }
    if (e.key === 'Escape') {
      setChangingRating(false);
      setRating(game.user_rating);
    }
  };

  const changeBannerHandler = (e) => {
    e.preventDefault();
    setChangingBanner(true);
    resetContext();
  };

  const updateBanner = async () => {
    if (bannerLink.trim() == '') return;
    try {
      const request = await axios.put(`${baseURL}/app/update_game_banner`, {
        email: userEmail,
        currentProfile: activeProfile.name,
        url: bannerLink,
        gameId: game.id,
      });
      localStorage.setItem('profile', request.data.response.profile.name);
      setCurrentGame(request.data.response.game);
      updateCollection(request.data.response.profile.collection);
      setChangingBanner(false);
      setBannerLink('');
      return request.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <div className='user_game__wrapper'>
      {changingBanner && (
        <div className='user_game__modal'>
          <div className='modal_content'>
            <h2
              style={{
                maxWidth: '75%',
                textAlign: 'center',
                marginBottom: '25px',
              }}
            >
              Please enter the link to any image or gif below.
            </h2>

            <div className='modal_form' style={{ width: '100%' }}>
              <input
                style={{ width: '80%' }}
                value={bannerLink}
                onChange={(e) => setBannerLink(e.target.value)}
              />
              <button onClick={updateBanner}>Submit</button>
              <button onClick={() => setChangingBanner(false)}>Back</button>
            </div>
          </div>
        </div>
      )}
      <div className='user_game__banner'>
        {showBannerMenu && (
          <ul
            className='user_game__banner_context'
            style={{ top: anchorPoint.y + 5, left: anchorPoint.x }}
          >
            <li className='banner_context__item' onClick={changeBannerHandler}>
              Set Custom Banner
            </li>
            <li className='banner_context__item'>Set Custom Logo</li>
            <li className='banner_context__item'>Set Default Image</li>
          </ul>
        )}

        <div className='user_game__exit' onClick={closeStats}>
          X
        </div>
        <img
          className='user_game_banner_img'
          src={
            game.banner_image ||
            game.cover_image.replace('cover_big_2x', '1080p_2x')
          }
        />
        <div className='user_game__current_stats'>
          {/* PLAYTIME */}
          <div className='playtime_container'>
            <FiClock className='playtime_clock_icon' />
            <div className='stats_item'>
              <h3 style={{ color: changingPlaytime && '#9147ff' }}>
                PLAY TIME
              </h3>
              <span
                style={{ display: changingPlaytime && 'none' }}
                className='previous_playtime'
                onClick={() => setChangingPlaytime(true)}
              >
                {toHoursAndMinutes(game.playtime)}
              </span>
              <input
                type='number'
                value={playtime}
                min='0'
                onKeyDown={determinePlaytimeAction}
                onChange={(e) => setPlaytime(e.target.value)}
                className={`playtime_input ${
                  changingPlaytime && 'playtime_focused'
                }`}
              />
            </div>
          </div>

          {/* RATING */}
          <div className='rating_container'>
            <div className='stats_item'>
              <h3>RATING</h3>
              <span
                onClick={() => setChangingRating(true)}
                className='previous_rating'
                style={{ display: changingRating && 'none' }}
              >
                {game.user_rating || 0}%
              </span>

              <input
                className='rating_input'
                type='number'
                min='0'
                max='100'
                value={rating || 0}
                onKeyDown={determineRatingAction}
                onChange={(e) => setRating(e.target.value)}
                style={{
                  width: !changingRating && '0px',
                  display: !changingRating && 'none',
                }}
              />
            </div>
          </div>

          {/* BACKLOG STATUS */}
          <div className='achievement_count_container'>
            <div className='stats_item'>
              <h3>STATUS</h3>
              <button
                onClick={() => setChangingBacklog(!changingBacklog)}
                style={{
                  backgroundColor:
                    backlogStatus == 'BACKLOG'
                      ? 'dodgerblue'
                      : backlogStatus == 'STARTED'
                      ? 'aqua'
                      : backlogStatus == 'FINISHED'
                      ? 'green'
                      : backlogStatus == 'PLAYING'
                      ? 'pink'
                      : backlogStatus == '100%'
                      ? 'gold'
                      : backlogStatus == 'ABANDONDED'
                      ? 'red'
                      : 'grey',
                }}
                className='status_btn'
              >
                {backlogStatus}
              </button>
            </div>
            {changingBacklog && (
              <div className='backlog_items'>
                <ul className='backlog_items_list'>
                  <li
                    style={{
                      backgroundColor: 'BACKLOG' == game.status && '#9147ff',
                      color: 'BACKLOG' == game.status && 'white',
                    }}
                    className='backlog_items_item'
                    onClick={() => {
                      updateBacklogHandler('BACKLOG');
                    }}
                  >
                    Backlog
                  </li>
                  <li
                    style={{
                      backgroundColor: 'STARTED' == game.status && '#9147ff',
                      color: 'STARTED' == game.status && 'white',
                    }}
                    className='backlog_items_item'
                    onClick={() => {
                      updateBacklogHandler('STARTED');
                    }}
                  >
                    Started
                  </li>
                  <li
                    style={{
                      backgroundColor: 'PLAYING' == game.status && '#9147ff',
                      color: 'PLAYING' == game.status && 'white',
                    }}
                    className='backlog_items_item'
                    onClick={() => {
                      updateBacklogHandler('PLAYING');
                    }}
                  >
                    Currently Playing
                  </li>
                  <li
                    style={{
                      backgroundColor: 'FINISHED' == game.status && '#9147ff',
                      color: 'FINISHED' == game.status && 'white',
                    }}
                    className='backlog_items_item'
                    onClick={() => {
                      updateBacklogHandler('FINISHED');
                    }}
                  >
                    Finished
                  </li>
                  <li
                    style={{
                      backgroundColor: '100%' == game.status && '#9147ff',
                      color: '100%' == game.status && 'white',
                    }}
                    className='backlog_items_item'
                    onClick={() => {
                      updateBacklogHandler('100%');
                    }}
                  >
                    100% Completed
                  </li>
                  <li
                    style={{
                      backgroundColor: 'ABANDONDED' == game.status && '#9147ff',
                      color: 'ABANDONDED' == game.status && 'white',
                    }}
                    className='backlog_items_item'
                    onClick={() => {
                      updateBacklogHandler('ABANDONDED');
                    }}
                  >
                    Abandonded
                  </li>
                  <li
                    style={{
                      backgroundColor: 'NOT OWNED' == game.status && '#9147ff',
                      color: 'NOT OWNED' == game.status && 'white',
                    }}
                    className='backlog_items_item'
                    onClick={() => {
                      updateBacklogHandler('NOT OWNED');
                    }}
                  >
                    Not Owned
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* SPOTIFY MUSIC */}
          <div className='music_icon_container'>
            <div className='stats_item' style={{ alignItems: 'center' }}>
              <h3>MUSIC</h3>
              <FaMusic
                className='music_icon'
                onClick={getSpotifyAlbum}
                style={{
                  color: viewingSoundtrack && spotifyToken && '#1DB954',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* GAME NEWS AND DATA */}
      <div
        className='user_game__data_wrapper'
        // style={{ paddingBottom: spotifyToken && viewingSoundtrack && '38px' }}
      >
        <div className='user_game__data'>
          {/* OWNED PLATFORMS */}
          {/* <div className='user_game__platforms'>
            <h4>Platforms Owned</h4>
            <ul>{game.origin == 'steam' && <li>Steam</li>}</ul>
          </div> */}

          {/* ACHIEVEMENT LIST */}
          {achievements && (
            <div
              className={`user_game__achievements_wrapper ${
                !viewStatus.achievements && 'minimized'
              }`}
            >
              <div className='user_game__achievements'>
                <div className='user_game__achievements_banner'>
                  <FaAngleDown
                    style={{
                      transform: !viewStatus.achievements
                        ? 'rotate(0)'
                        : 'rotate(180deg)',
                    }}
                    className='user_game__minimize_icon'
                    onClick={() => windowViewHandler('achievements')}
                  />
                  {achievementPercentage === 100 && (
                    <FaMedal className='user_game__completion_medal' />
                  )}
                  <h4>
                    <p>Achievements</p>
                  </h4>
                  <p>
                    You've unlocked {getAchievementCount(achievements)} (
                    {achievementPercentage}
                    %)
                  </p>
                  <div className='user_game__achievements_progress_bar_container'>
                    <div
                      className='user_game__achievements_progress_bar'
                      style={{
                        width: `${achievementPercentage}%`,
                        background: activeProfile.color,
                      }}
                    />
                  </div>
                  <div className='user_game__achievements_actions'>
                    <button
                      className={achievementFilter == 'unlocked' && 'active'}
                      onClick={() => setAchievementFilter('unlocked')}
                    >
                      Unlocked
                    </button>
                    <button
                      className={`${achievementFilter == 'locked' && 'active'}`}
                      onClick={() => setAchievementFilter('locked')}
                    >
                      In Progress
                    </button>
                  </div>
                </div>
                <ul className='user_game__achievements_list'>
                  {achievements
                    .filter((achievement) =>
                      achievementFilter == 'unlocked'
                        ? achievement.achieved
                        : !achievement.achieved
                    )
                    .sort((a, b) =>
                      a.displayName > b.displayName
                        ? 1
                        : b.displayName > a.displayName
                        ? -1
                        : 0
                    )
                    .map((item) => (
                      <li className='achievement_item'>
                        <div
                          className='achievement_item_icon'
                          style={{ border: `1px solid ${activeProfile.color}` }}
                        >
                          <img
                            className='achievement_item_icon__img'
                            src={item.achieved ? item.icon : item.icongray}
                          />
                        </div>
                        <div className='achievement_item_headers'>
                          <h4>{item.displayName}</h4>
                          {item.description && <p>{item.description}</p>}
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
          {/* PLAYSTATION TROPHIES */}
          {trophies && (
            <div
              className={`user_game__achievements_wrapper ${
                !viewStatus.trophies && 'minimized'
              }`}
            >
              <div
                className={`user_game__achievements ${
                  trophyPercentage == 100 && 'completed'
                }`}
              >
                <div className='user_game__achievements_banner'>
                  <FaAngleDown
                    style={{
                      transform: !viewStatus.trophies
                        ? 'rotate(0)'
                        : 'rotate(180deg)',
                    }}
                    className='user_game__minimize_icon'
                    onClick={() => windowViewHandler('trophies')}
                  />
                  {trophyPercentage === 100 && (
                    <FaMedal className='user_game__completion_medal' />
                  )}
                  <h4>
                    <p>Trophies</p>
                  </h4>
                  <p>
                    You've unlocked {getAchievementCount(trophies)} (
                    {trophyPercentage}%)
                  </p>
                  <div className='user_game__achievements_progress_bar_container'>
                    <div
                      className='user_game__achievements_progress_bar'
                      style={{
                        width: `${trophyPercentage}%`,
                        background: activeProfile.color,
                      }}
                    />
                  </div>

                  <div className='user_game__achievements_actions'>
                    <button
                      className={trophyFilter == 'unlocked' && 'active'}
                      onClick={() => setTrophyFilter('unlocked')}
                    >
                      Unlocked
                    </button>
                    {trophyPercentage < 100 && (
                      <button
                        className={`${trophyFilter == 'locked' && 'active'}`}
                        onClick={() => setTrophyFilter('locked')}
                      >
                        In Progress
                      </button>
                    )}
                  </div>
                </div>
                <ul className='user_game__achievements_list'>
                  {trophies
                    .filter((trophy) =>
                      trophyFilter == 'unlocked'
                        ? trophy.earned
                        : !trophy.earned
                    )
                    .sort((a, b) =>
                      a.trophyName > b.trophyName
                        ? 1
                        : b.trophyName > a.trophyName
                        ? -1
                        : 0
                    )
                    .map((item) => (
                      <li className='achievement_item' key={item.trophyName}>
                        <div
                          className='achievement_item_icon'
                          style={{ border: `1px solid ${activeProfile.color}` }}
                        >
                          <img
                            className={`achievement_item_icon__img ${
                              !item.earned && 'greyscale'
                            }`}
                            src={item.trophyIconUrl}
                          />
                        </div>
                        <div className='achievement_item_headers'>
                          <h4>{item.trophyName}</h4>
                          {item.trophyDetail && <p>{item.trophyDetail}</p>}
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
          <UserGameNotes
            profile={activeProfile}
            windowViewHandler={windowViewHandler}
            viewStatus={viewStatus}
            gameNotes={currentGameNotes}
            updateNotes={updateProfileNotes}
          />
          {spotifyToken && viewingSoundtrack && (
            <div className='user_game__soundtrack_wrapper'>
              <div className='user_game__soundtrack_header'>
                <h3>Spotify Game Album</h3>
              </div>
              <div className='user_game__soundtrack_playlist'>
                <ul>
                  {gameOST.map((song) => (
                    <li
                      key={song.trackUri}
                      onClick={(e) => selectTrackHandler(e, song)}
                    >
                      {song.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      {spotifyToken && viewingSoundtrack && (
        <SpotifyPlayback
          spotifyToken={spotifyToken}
          playAudio={playAudio}
          beginPlayback={beginPlayback}
          pausePlayback={pausePlayback}
          trackUri={currentTrack?.uri}
        />
      )}
    </div>
  );
};

export default UserGame;
