import React, { useState, useEffect } from 'react';
import './UserGame.css';
import axios from 'axios';
import { FiClock } from 'react-icons/fi';
import { FaMedal } from 'react-icons/fa';

const UserGame = ({ game, closeStats }) => {
  // RATING, PLAYTIME, ACHIEVEMENTS, SPOTIFY, NOTES, STATUS(COMPLETED, BACKLOG, ETC.)
  const baseURL = process.env.REACT_APP_BASE_URL;
  const steamID = localStorage.getItem('steamID');
  const [achievements, setAchievements] = useState(null);

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const request = await axios.get(`${baseURL}/steam/get_game_stats`, {
          params: {
            gameId: game.id,
            steamId: steamID,
          },
        });
        if (Object.keys(request.data).length > 0) {
          console.log(request.data.achievements);
          setAchievements(request.data.achievements);
        } else {
          console.log('Nah');
          setAchievements(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppData();
  }, [game]);

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
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${padTo2Digits(hours)}.${padTo2Digits(minutes)} hours`;
  }

  return (
    <div className='user_game__wrapper'>
      <div className='user_game__banner'>
        <img src={game.imageURL.replace('cover_big_2x', '1080p_2x')} />
        <div className='user_game__current_stats'>
          {/* PLAYTIME */}
          <div className='playtime_container'>
            <FiClock className='playtime_clock_icon' />
            <div className='stats_item'>
              <h4>PLAY TIME</h4>
              <span>{toHoursAndMinutes(game.playtime)}</span>
            </div>
          </div>
          {/* RATING */}
          <div className='rating_container'>
            <div className='stats_item'>
              <h4>RATING</h4>
              <span>{game.user_rating || 0}%</span>
            </div>
          </div>
          {/* ACHIEVEMENT  */}
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
    </div>
  );
};

export default UserGame;
