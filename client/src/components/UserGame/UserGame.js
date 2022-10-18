import React, { useState, useEffect, useRef } from 'react';
import './UserGame.css';
import axios from 'axios';
import { FiClock } from 'react-icons/fi';
import { FaMedal } from 'react-icons/fa';
import { GiNorthStarShuriken } from 'react-icons/gi';
import { RiStarSFill } from 'react-icons/ri';
import { DynamicStar } from 'react-dynamic-star';

const UserGame = ({
  game,
  activeProfile,
  closeStats,
  setProfile,
  setNotification,
  setCurrentlyViewing,
}) => {
  // RATING, PLAYTIME, ACHIEVEMENTS, SPOTIFY, NOTES, STATUS(COMPLETED, BACKLOG, ETC.), PLATFORMS OWNED
  const baseURL = process.env.REACT_APP_BASE_URL;
  const steamID = localStorage.getItem('steamID');
  const [achievements, setAchievements] = useState(null);
  const [playtime, setPlaytime] = useState(game.playtime / 60);
  const [changingPlaytime, setChangingPlaytime] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [rating, setRating] = useState(game.user_rating || 0);
  const ratingRef = useRef('');
  const [changingRating, setChangingRating] = useState(false);
  const [gameNews, setGameNews] = useState(null);
  const userEmail = JSON.parse(localStorage.getItem('user'))?.email;

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setChangingRating(false);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  useEffect(() => {
    if (!steamID) {
      console.log('No steam id');
      return;
    }
    const fetchAppData = async () => {
      try {
        const steamGameAchievements = await axios.get(
          `${baseURL}/steam/get_game_achievements`,
          {
            params: {
              gameId: game.id,
              steamId: steamID,
            },
          }
        );

        // const steamGameNews = await axios.get(`${baseURL}/steam/get_game_stats`, {
        //   params: {
        //     gameId: game.id,
        //   },
        // });

        if (Object.keys(steamGameAchievements.data).length > 0) {
          console.log(steamGameAchievements.data.achievements);
          setAchievements(steamGameAchievements.data.achievements);
        } else {
          setAchievements(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppData();
  }, [game]);

  const handleMouseMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setRating(Math.floor(event.clientX - bounds.left) / 20);
  };

  const getAchievementCount = (list) => {
    if (!list) return 'N/A';
    const numberAchieved = list.filter((game) => game.achieved == true).length;
    return numberAchieved + '/' + list.length;
  };

  // Convert steam minutes to numbers
  function padTo2Digits(num) {
    return num.toString().padStart(1, '0');
  }

  function toHoursAndMinutes(totalMinutes) {
    if (totalMinutes <= 0 && game.type == 'steam') return 'Not Started';
    else if (totalMinutes <= 0 && game.type !== 'steam') return 0 + ' hours';
    else {
      const minutes = totalMinutes % 60;
      const hours = totalMinutes / 60;
      if (minutes == 0) return hours + ' hours';
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
        JSON.stringify(request.data.response.profile)
      );
      setProfile(request.data.response.profile);
      setCurrentlyViewing(request.data.response.game);
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
          JSON.stringify(request.data.response.profile)
        );
        setProfile(request.data.response.profile);
        setCurrentlyViewing(request.data.response.game);
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

  const determinePlaytimeAction = (e) => {
    if (e.key === 'Enter') {
      updatePlaytime();
    }
    if (e.key === 'Escape') {
      setChangingPlaytime(false);
      setPlaytime(game.playtime / 60);
    }
  };

  return (
    <div className='user_game__wrapper'>
      <div className='user_game__banner'>
        <div className='user_game__exit' onClick={closeStats}>
          X
        </div>
        <img src={game.imageURL.replace('cover_big_2x', '1080p_2x')} />
        <div className='user_game__current_stats'>
          {/* PLAYTIME */}
          <div className='playtime_container'>
            <FiClock className='playtime_clock_icon' />
            <div className='stats_item'>
              <h4 style={{ color: changingPlaytime && '#9147ff' }}>
                PLAY TIME
              </h4>
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
              <h4 style={{ paddingBottom: changingRating && '4px' }}>RATING</h4>
              <span
                onClick={() => setChangingRating(true)}
                className='previous_rating'
                style={{ display: changingRating && 'none' }}
              >
                {game.user_rating}%
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
                {/* <GiNorthStarShuriken className='rating_star' />
                <GiNorthStarShuriken className='rating_star' />
                <GiNorthStarShuriken className='rating_star' />
                <GiNorthStarShuriken className='rating_star' />
                <GiNorthStarShuriken className='rating_star' /> */}
              </div>
            </div>
          </div>

          {/* ACHIEVEMENT COUNTER  */}
          <div className='achievement_count_container'>
            <FaMedal className='achievement_medal_icon' />
            <div className='stats_item'>
              <h4>ACHIEVEMENTS</h4>
              <span>{getAchievementCount(achievements)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='user_game__header'>
        <h2 className='user_game__title'>{game.name}</h2>
      </div>
      <div className='user_game__data'>
        <div className='user_game__platforms'>
          <h4>Platforms Owned</h4>
          <ul>{game.origin == 'steam' && <li>Steam</li>}</ul>
        </div>
      </div>
    </div>
  );
};

export default UserGame;
