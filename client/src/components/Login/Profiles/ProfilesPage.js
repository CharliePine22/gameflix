import React, { useEffect, useState } from 'react';
import './ProfilesPage.css';
import jessAvatar from '../../../assets/images/kairi-icon.png';
import yunaAvatar from '../../../assets/images/yuna-icon.png';
import banditAvatar from '../../../assets/images/lion-icon.png';
import cjAvatar from '../../../assets/images/roxas-icon.png';
import { MdEdit } from 'react-icons/md';
import ProfileEditor from './ProfileEditor/ProfileEditor';

const ProfilesPage = (props) => {
  const [editingProfiles, setEditingProfiles] = useState(false);
  const [creatingProfile, setCreatingProfile] = useState(null);
  const [profiles, setProfiles] = useState(null);

  const [dummyData, setDummyData] = useState([
    { name: 'Cj', avatar: cjAvatar, color: 'blue' },
    {
      name: 'Jessica',
      avatar: jessAvatar,
      color: 'pink',
    },
    {
      name: 'Yuna',
      avatar: yunaAvatar,
      color: 'purple',
    },
    {
      name: 'Bandit',
      avatar: banditAvatar,
      color: 'silver',
    },
    {
      name: 'Ryan',
      avatar: banditAvatar,
      color: 'gold',
    },
  ]);

  // Set active profile
  const chooseCurrentProfile = (user) => {
    localStorage.setItem('profile', JSON.stringify(user));
    props.selectProfile(user);
  };

  // Handler to determine click function when editing profiles or not
  const profileSelectHandler = (user) => {
    if (!editingProfiles) chooseCurrentProfile(user);
    else {
      setCreatingProfile(user);
    }
  };

  useEffect(() => {
    setProfiles(props.currentUser.profiles);
  }, [props.currentUser]);

  if (profiles == null) {
    return;
  }

  if (creatingProfile !== null) {
    return (
      <ProfileEditor
        currentProfile={creatingProfile}
        viewAllProfiles={() => setCreatingProfile(null)}
      />
    );
  }

  return (
    <div className='profile__page'>
      <div className='profile_edit__header'>
        <h3>GAMEFLIX</h3>
      </div>
      <div className='profile__container'>
        <h3>Who's gaming?</h3>
        <ul className='profile__list'>
          {profiles.map((user) => (
            <li
              key={user.name}
              className='profile__user'
              onClick={() => profileSelectHandler(user)}
            >
              {editingProfiles && (
                <MdEdit
                  className='edit-icon'
                  onClick={() => console.log('Clicked')}
                />
              )}
              <img
                className={`profile__user_avatar ${
                  editingProfiles && 'editing'
                }`}
                style={{ backgroundColor: user.color }}
                src={`http://localhost:5000/${user.avatar}`}
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
          {profiles.length < 5 && (
            <button
              className='profile__new_btn'
              onClick={() => setCreatingProfile(true)}
            >
              New Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilesPage;
