import React, { useRef, useState } from 'react';
import './ProfileEditor.css';

const ProfileEditor = (props) => {
  const nameRef = useRef('');
  return (
    <div className='profile_edit__container'>
      <div className='profile_edit__header'>
        <h3>GAMEFLIX</h3>
      </div>
      <div className='profile_edit__form_wrapper'>
        <h3>
          {props.currentProfile !== true ? 'Edit Profile' : 'Create Profile'}
        </h3>
        <div className='form_container'>
          <div className='form_avatar_container'>
            <img
              className='current_avatar'
              style={{ backgroundColor: props.currentProfile.color }}
              src={`http://localhost:5000/${props.currentProfile.avatar}`}
            />
          </div>
          <div className='form_right'>
            <form className='profile_edit_form'>
              <input ref={nameRef} defaultValue={props.currentUser?.name} />
            </form>
          </div>
        </div>
        <div className='form_actions'>
          <button className='save_btn'>Save</button>
          <button className='cancel_btn' onClick={props.viewAllProfiles}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
