import React, { useEffect, useState } from 'react';
import './NavDropdown.css';
import { FaSortUp, FaUserEdit } from 'react-icons/fa';
import { IoSettingsOutline } from 'react-icons/io5';
import jessAvatar from '../../assets/images/kairi-icon.png';
import yunaAvatar from '../../assets/images/org-icon.png';
import banditAvatar from '../../assets/images/lion-icon.png';

const NavDropdown = (props) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });

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

  // if y is greater than 302 or less than 12
  // if y is greater than 78
  // if x is less than 482 or greater than 662

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

  // Track the mouse for the current global coordinates
  useEffect(() => {
    const handleWindowMouseMove = (event) => {
      setGlobalCoords({
        x: event.screenX,
        y: event.screenY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);

  // Set the coordinates relative to the event element
  const handleMouseMove = (event) => {
    setCoords({
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop,
    });
  };

  // console.log(coords.x);

  return (
    <div
      className='dropdown'
      onMouseMove={handleMouseMove}
      // onMouseLeave={props.closeNavDropdown}
    >
      <FaSortUp className='dropdown__arrow' />
      <div className='dropdown__profiles'>
        <ul className='dropdown__profiles_list'>
          {dummyData.map((user) => (
            <li className='dropdown__profiles_item' key={user.name}>
              <img
                src={user.avatar}
                className='dropdown__profile_icon'
                alt={`${user.name} avatar icon`}
              />
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
        <a className='dropdown__settings_link' onClick={props.logoutHandler}>
          Sign out of GameFlix
        </a>
      </div>
    </div>
  );
};

export default NavDropdown;
