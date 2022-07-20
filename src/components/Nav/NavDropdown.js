import React from 'react';
import './NavDropdown.css';
import { FaSortUp, FaUserEdit } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import jessAvatar from '../../assets/images/kairi-icon.png';
import yunaAvatar from '../../assets/images/org-icon.png';
import banditAvatar from '../../assets/images/lion-icon.png';

function NavDropdown() {
  const dummyData = [
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
  return (
    <div className='dropdown'>
      <FaSortUp className='dropdown__arrow' />
      <div className='dropdown__profiles'>
        <ul className='dropdown__profiles_list'>
          {dummyData.map((user) => (
            <li className='dropdown__profiles_item' key={user.name}>
              <img src={user.avatar} className='dropdown__profile_icon' />
              <p className='dropdown__profile_name'>{user.name}</p>
            </li>
          ))}
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
        <a className='dropdown__settings_link'>Sign out of GameFlix</a>
      </div>
    </div>
  );
}

export default NavDropdown;
