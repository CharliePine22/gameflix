import React, { useEffect, useState } from 'react';
import './ProfilesPage.css';
import defaultAvatar from '../../../assets/images/basic_avatar.png';
import { MdEdit } from 'react-icons/md';
import ProfileEditor from './ProfileEditor/ProfileEditor';
import ProfileCreation from './ProfileEditor/ProfileCreation';

const ProfilesPage = (props) => {
  const [editingProfiles, setEditingProfiles] = useState(false);
  const [creatingProfile, setCreatingProfile] = useState(null);
  const [profiles, setProfiles] = useState(null);

  // Set active profile
  const chooseCurrentProfile = (user) => {
    localStorage.setItem('profile', JSON.stringify(user));
    props.selectProfile(user);
  };

  // Handler to update application if user edits or creates a profile
  const updateProfiles = () => {
    props.updatingUser();
  };

  // Handler to determine click function when editing profiles or not
  const profileSelectHandler = (user) => {
    if (!editingProfiles) chooseCurrentProfile(user);
    else {
      setCreatingProfile(user);
    }
  };

  // Determine what user is selected and grab their profiles
  useEffect(() => {
    setProfiles(props.currentUser.profiles);
  }, [props.currentUser]);

  if (profiles == null) {
    return;
  }

  if (creatingProfile !== null && creatingProfile !== 'new') {
    return (
      <ProfileEditor
        saveEdit={props.saveEdit}
        currentProfile={creatingProfile}
        viewAllProfiles={() => setCreatingProfile(null)}
        userEmail={props.currentUser.email}
      />
    );
  }

  if (creatingProfile !== null && creatingProfile == 'new') {
    return (
      <ProfileCreation
        updateUser={updateProfiles}
        userEmail={props.currentUser.email}
        viewAllProfiles={() => setCreatingProfile(null)}
      />
    );
  }

  profiles.sort((a, b) => (a.isAdmin ? -1 : b.isAdmin ? 1 : 0));

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
              <img
                className={`profile__user_avatar ${
                  editingProfiles && 'editing'
                }`}
                style={{ backgroundColor: user.color }}
                src={user.avatar !== null ? `${user.avatar}` : defaultAvatar}
              />
              {editingProfiles && <MdEdit className='edit-icon' />}
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
              onClick={() => setCreatingProfile('new')}
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
