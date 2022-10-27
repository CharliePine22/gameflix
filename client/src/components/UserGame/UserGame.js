import React, { useState, useEffect, useRef } from 'react';
import './UserGame.css';
import axios from 'axios';
import { FiClock } from 'react-icons/fi';
import { FaMedal, FaMusic } from 'react-icons/fa';
import { DynamicStar } from 'react-dynamic-star';
import useContextMenu from '../../hooks/useContextMenu';

const UserGame = ({
  game,
  activeProfile,
  closeStats,
  setProfile,
  setNotification,
  setCurrentGame,
}) => {
  // RATING, PLAYTIME, ACHIEVEMENTS, SPOTIFY, NOTES, STATUS(COMPLETED, BACKLOG, ETC.), PLATFORMS OWNED
  const { anchorPoint, showBannerMenu } = useContextMenu();
  // Achievement States
  const [achievements, setAchievements] = useState(game.achievements);
  const [achievementData, setAchievementData] = useState(null);
  // Playtime States
  const [playtime, setPlaytime] = useState(Math.floor(game.playtime / 60));
  const [changingPlaytime, setChangingPlaytime] = useState(false);
  // Rating States
  const [rating, setRating] = useState(game.user_rating);
  const [changingRating, setChangingRating] = useState(false);
  const [gameNews, setGameNews] = useState(null);
  const [changingBanner, setChangingBanner] = useState(false);
  const [bannerLink, setBannerLink] = useState('');
  const [backlogStatus, setBacklogStatus] = useState(game.status);
  const [changingBacklog, setChangingBacklog] = useState(false);
  // BACKLOG, CURRENTLY PLAYING, COMPLETED, STARTED, ABANDONED, 100%, NOT OWNED
  // Hooks and Storage Variables
  const baseURL = process.env.REACT_APP_BASE_URL;
  const steamID = localStorage.getItem('steamID');
  const achievementsIntegrated = localStorage.getItem('achivementsConn');
  const userEmail = localStorage.getItem('user');

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
    setChangingPlaytime(false);
    setChangingRating(false);
    setChangingBacklog(false);
    setBacklogStatus(game.status || 'BACKLOG');
    setPlaytime(Math.floor(game.playtime / 60));
    setRating(game.user_rating);
    setAchievements(game.achievements);
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

          console.log(addAchievements);
          setProfile(addAchievements.data.response.profile);
          setCurrentGame(addAchievements.data.response.game);
          setAchievements(addAchievements.data.response.game.achievements);
        }
      } catch (error) {
        console.log(error);
      }

      // setPlaytime(Math.floor(game.playtime / 60));
      // setRating(game.user_rating);
    };
    fetchAppData();
  }, [game]);

  const handleMouseMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const position = Math.floor(event.clientX - bounds.left) / 20;
    console.log(position * 20 - 20);
    setRating(Math.floor(event.clientX - bounds.left) / 20);
    console.log(event);
  };

  const getAchievementCount = (list) => {
    if (!list) return 'N/A';
    const numberAchieved = list.filter((game) => game.achieved == true).length;
    return numberAchieved + '/' + list.length;
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
      // setPlaytime(hours)
      return `${hours}.${padTo2Digits(minutes)} hours`;
    }
  }

  const updateRatingHandler = async () => {
    try {
      const request = await axios.put(`${baseURL}/app/update_game_rating`, {
        email: userEmail,
        currentProfile: activeProfile.name,
        rating: rating * 20,
        gameId: game.id,
      });
      console.log(request);
      localStorage.setItem(
        'profile',
        JSON.stringify(request.data.response.profile.name)
      );
      setProfile(request.data.response.profile);
      setCurrentGame(request.data.response.game);
      setRating(request.data.response.game.rating);
      setNotification({
        message: `${game.name} playtime successfully updated!`,
        status: 'SUCCESS',
      });
      setChangingRating(false);
    } catch (error) {
      console.log(error);
      setNotification({
        message: `Something went wrong, please try again!`,
        status: 'ERROR',
      });
    }
  };

  const updatePlaytime = async () => {
    if (game.playtime == playtime) {
      console.log('No new changes');
      return;
    } else {
      try {
        const request = await axios.put(`${baseURL}/app/update_game_playtime`, {
          email: userEmail,
          currentProfile: activeProfile.name,
          playtime: playtime * 60,
          gameId: game.id,
        });
        console.log(request);
        localStorage.setItem(
          'profile',
          JSON.stringify(request.data.response.profile.name)
        );
        setProfile(request.data.response.profile);
        setCurrentGame(request.data.response.game);
        setPlaytime(request.data.response.game.playtime / 60);
        setNotification({
          message: `${game.name} playtime successfully updated!`,
          status: 'SUCCESS',
        });
        setChangingPlaytime(false);
      } catch (error) {
        console.log(error);
        setNotification({
          message: `Something went wrong, please try again!`,
          status: 'ERROR',
        });
      }
    }
  };

  const updateBacklog = async (status) => {
    if (status == backlogStatus) {
      console.log('No new update');
      return;
    }
    try {
      const request = await axios.put(`${baseURL}/app/update_game_backlog`, {
        email: userEmail,
        currentProfile: activeProfile.name,
        status: status,
        gameId: game.id,
      });
      localStorage.setItem(
        'profile',
        JSON.stringify(request.data.response.profile)
      );
      setProfile(request.data.response.profile);
      setCurrentGame(request.data.response.game);
      setBacklogStatus(request.data.response.game.status);
      setNotification({
        message: `${game.name} backlog successfully updated!`,
        status: 'SUCCESS',
      });
      setChangingPlaytime(false);
    } catch (error) {
      console.log(error);
      setNotification({
        message: `Something went wrong, please try again!`,
        status: 'ERROR',
      });
    }
  };

  const updateBacklogHandler = (status) => {
    updateBacklog(status);
    setChangingBacklog(false);
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

  const changeBannerHandler = (e) => {
    e.preventDefault();
    setChangingBanner(true);
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
      localStorage.setItem(
        'profile',
        JSON.stringify(request.data.response.profile)
      );
      setProfile(request.data.response.profile);
      setCurrentGame(request.data.response.game);
      setPlaytime(request.data.response.game.playtime / 60);
      setNotification({
        message: `${game.name} playtime successfully updated!`,
        status: 'SUCCESS',
      });
      setChangingPlaytime(false);
    } catch (error) {
      console.log(error);
      setNotification({
        message: `Something went wrong, please try again!`,
        status: 'ERROR',
      });
    }
    setChangingBanner(false);
    setBannerLink('');
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
            game.imageURL.replace('cover_big_2x', '1080p_2x')
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
              <h3 style={{ paddingBottom: changingRating && '4px' }}>RATING</h3>
              <span
                onClick={() => setChangingRating(true)}
                className='previous_rating'
                style={{ display: changingRating && 'none' }}
              >
                {game.user_rating || 0}%
              </span>
              <div
                className='rating_stars'
                onMouseMove={handleMouseMove}
                onClick={updateRatingHandler}
                style={{
                  width: !changingRating && '0px',
                  display: !changingRating && 'none',
                }}
              >
                <DynamicStar
                  rating={rating}
                  totalStars={5}
                  width={20}
                  height={20}
                  outlined={true}
                />
              </div>
            </div>
          </div>

          {/* ACHIEVEMENT COUNTER  */}
          {/* <div className='achievement_count_container'>
            <FaMedal className='achievement_medal_icon' />
            <div className='stats_item'>
              <h3>ACHIEVEMENTS</h3>
              <span>{getAchievementCount(achievements)}</span>
            </div>
          </div> */}

          {/* BACKLOG STATUS */}
          <div className='achievement_count_container'>
            <div className='stats_item'>
              <h3 style={{ paddingTop: '5px' }}>STATUS</h3>
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
            <div className='stats_item'>
              <h3>MUSIC</h3>
              <FaMusic className='music_icon' />
            </div>
          </div>
        </div>
      </div>

      {/* GAME NEWS AND DATA */}
      <div className='user_game__data'>
        {/* <div className='user_game__header'>
          <h2 className='user_game__title'>{game.name}</h2>
        </div> */}
        {/* OWNED PLATFORMS */}
        <div className='user_game__platforms'>
          <h4>Platforms Owned</h4>
          <ul>{game.origin == 'steam' && <li>Steam</li>}</ul>
        </div>

        {/* ACHIEVEMENT LIST */}
        {achievements && (
          <div className='user_game__achievements_wrapper'>
            <h3>Achievements</h3>

            <div className='user_game__achievements'>
              <div className='user_game__achievements_banner'>
                <p>
                  You've unlocked {getAchievementCount(achievements)} (
                  {Math.floor(
                    (achievements.filter((game) => game.achieved == true)
                      .length /
                      achievements.length) *
                      100
                  )}
                  %)
                </p>
                <div className='user_game__achievements_progress_bar_container'>
                  <div
                    className='user_game__achievements_progress_bar'
                    style={{
                      width: `${Math.floor(
                        (achievements.filter((game) => game.achieved == true)
                          .length /
                          achievements.length) *
                          100
                      )}%`,
                      background: activeProfile.color,
                    }}
                  />
                </div>
              </div>
              <ul className='user_game__achievements_list'>
                {achievements.map((item) => (
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
        <div
          className='user_game__data_img'
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${game.imageURL.replace(
              'cover_big_2x',
              '1080p_2x'
            )})`,
            backgroundPosition: 'center center',
          }}
        />
      </div>
    </div>
  );
};

export default UserGame;
