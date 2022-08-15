import React, { useEffect, useState } from 'react';
import './ProfilesPage.css';
import jessAvatar from '../../../assets/images/kairi-icon.png';
import yunaAvatar from '../../../assets/images/yuna-icon.png';
import banditAvatar from '../../../assets/images/lion-icon.png';
import cjAvatar from '../../../assets/images/roxas-icon.png';
import { MdEdit } from 'react-icons/md';

const ProfilesPage = (props) => {
  const [editingProfiles, setEditingProfiles] = useState(false);

  const [dummyData, setDummyData] = useState([
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
  ]);

  const chooseCurrentProfile = (user) => {
    localStorage.setItem('profile', JSON.stringify(user));
    props.selectProfile(user);
  };

  return (
    <div className='profile__page'>
      <div className='profile__container'>
        <h3>Who's gaming?</h3>
        <ul className='profile__list'>
          {dummyData.map((user) => (
            <li
              key={user.name}
              className='profile__user'
              onClick={() => chooseCurrentProfile(user)}
            >
              {editingProfiles && <MdEdit className='edit-icon' />}
              <img
                className={`profile__user_avatar ${
                  editingProfiles && 'editing'
                }`}
                src={user.avatar}
              />
              <span className='profile__user_name'>{user.name}</span>
            </li>
          ))}
        </ul>
        <div className='profile__actions'>
          <button
            className={`profile__manage_btn ${editingProfiles && 'edit_btn'}`}
            onClick={() => setEditingProfiles(!editingProfiles)}
          >
            {editingProfiles ? 'Done' : 'Manage Profiles'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilesPage;
