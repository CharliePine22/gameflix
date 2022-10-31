import React, { useEffect } from 'react';
import axios from 'axios';
import './NavDropdown.css';
// React Icons
import { FaSortUp, FaSpotify, FaUserEdit, FaPlaystation } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';

import steamAuthBtn from '../../assets/images/steam-auth-btn.png';

const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_BASE_URL}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;
const STEAM_AUTH_URL = 'https://steamcommunity.com/openid';

const NavDropdown = (props) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const allProfiles = props.allProfiles;

  // Listens for escape key press to close nav dropdown
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        props.closeNavDropdown();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Change current user
  const changeUserHandler = (user) => {
    props.changeProfile(user);
  };

  const steamAuthHandler = async () => {
    const request = await axios.get(`${baseURL}/steam/steam_auth`);
  };

  const generatePlaystationTitles = async () => {
    const request = await axios.get(`${baseURL}/playstation/user_titles`);
    for (let game of request.data) {
      for (let i = 0; i < game.earnedTrophies.length; i++) {
        if (game.earnedTrophies[i].earned) {
          game.allTrophies[i].earned = true;
        } else game.allTrophies[i].earned = false;
      }
    }

    props.currentCollection.filter((ownedGame) => {
      const inCollection = request.data.some((game) => {
        if (ownedGame.name.toLowerCase() === game.name.toLowerCase()) {
          ownedGame.trophies = game.allTrophies;
          axios.put(`${baseURL}/app/update_game_trophies`, {
            email: localStorage.getItem('user'),
            name: localStorage.getItem('profile'),
            gameId: ownedGame.id,
            trophies: game.allTrophies,
          });
        }
        // else {
        //   console.log('New game bruh');
        // axios.post(`${baseURL}/app/update_collection`, {
        //   email: localStorage.getItem('user'),
        //   currentProfile: localStorage.getItem('profile'),
        //   name: game.name,
        //   id: game.id,
        //   imageURL: `//images.igdb.com/igdb/image/upload/t_1080p_2x/${game.cover.image_id}.jpg`,
        //   playtime: 0,
        //   origin: 'gameflix',
        // });
        // }
      });
      return inCollection;
    });
  };

  allProfiles.sort((a, b) => (a.name - b.name ? 1 : -1));

  return (
    <div className='dropdown'>
      <FaSortUp className='dropdown__arrow' />
      <div className='dropdown__profiles'>
        <ul className='dropdown__profiles_list'>
          {allProfiles.map((user) => {
            if (user.name !== props.activeProfile.name) {
              return (
                <li
                  className='dropdown__profiles_item'
                  key={user.name}
                  onClick={() => changeUserHandler(user)}
                >
                  <img
                    src={user.avatar}
                    className='dropdown__profile_icon'
                    alt={`${user.name} avatar icon`}
                    style={{ backgroundColor: user.color }}
                  />
                  <p className='dropdown__profile_name'>{user.name}</p>
                </li>
              );
            }
          })}
          <li className='dropdown__profiles_item' onClick={props.toProfilePage}>
            <span className='dropdown__profiles_manage'>
              <MdEdit size={22} />
            </span>
            <p className='dropdown__profile_name'>Manage Profiles</p>
          </li>
        </ul>
      </div>
      <div className='dropdown__settings'>
        <div
          className='dropdown__settings_item'
          onClick={() => props.editProfile()}
        >
          <span className='dropdown__settings_item_icon'>
            <FaUserEdit size={18} />
          </span>
          <p>My Profile</p>
        </div>
        <div className='dropdown__settings_item' onClick={props.editAccount}>
          <span className='dropdown__settings_item_icon'>
            <IoSettingsOutline size={18} />
          </span>
          <p>Account Settings</p>
        </div>
        <div
          className='dropdown__settings_item'
          onClick={generatePlaystationTitles}
        >
          <span className='dropdown__settings_item_icon'>
            <FaPlaystation size={18} />
          </span>
          <p>Link Playstation</p>
        </div>
        <div className='dropdown__settings_item'>
          <span className='dropdown__settings_item_icon'>
            <FaSpotify
              size={18}
              style={{ color: props.spotifyToken ? '#1DB954' : '#FFF' }}
            />
          </span>
          <a href={SPOTIFY_AUTH_URL}>Spotify Authentication</a>
        </div>
        <div
          className='dropdown__settings_item'
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: '0',
            paddingLeft: '0',
          }}
        >
          <a href={`http://localhost:3001/api/auth/steam`}>
            <img
              className='steam_btn'
              // onClick={steamAuthHandler}
              src={steamAuthBtn}
            />
          </a>
        </div>
      </div>
      <div className='dropdown__settings_links'>
        <a className='dropdown__settings_link' onClick={props.logoutHandler}>
          Sign out of GameFlix
        </a>
      </div>
    </div>
  );
};

export default NavDropdown;
