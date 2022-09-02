import React, { useEffect, useState } from 'react';
import './NavDropdown.css';
// React Icons
import { FaSortUp, FaUserEdit } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdEdit } from 'react-icons/md';
// Dummy Image Imports
import jessAvatar from '../../assets/images/kairi-icon.png';
import yunaAvatar from '../../assets/images/yuna-icon.png';
import cjAvatar from '../../assets/images/roxas-icon.png';
import banditAvatar from '../../assets/images/lion-icon.png';

const NavDropdown = (props) => {
  // Profile dummy data until account creation is incorporated
  const allProfiles = props.allProfiles;
  const dummyData = [
    { name: 'Cj', avatar: cjAvatar },
    {
      name: 'Jessica',
      avatar: jessAvatar,
    },
    {
      name: 'Yuna',
      avatar: yunaAvatar,
    },
    {
      name: 'Bandit',
      avatar: banditAvatar,
    },
  ];

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
        <div className='dropdown__settings_item'>
          <span className='dropdown__settings_item_icon'>
            <FaUserEdit size={18} />
          </span>
          <p>My Profile</p>
        </div>
        <div className='dropdown__settings_item'>
          <span className='dropdown__settings_item_icon'>
            <IoSettingsOutline size={18} />
          </span>
          <p>Account Settings</p>
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