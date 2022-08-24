import React, { useRef, useState, useEffect } from 'react';
import './ProfileEditor.css';
import axios from 'axios';
import { MdEdit } from 'react-icons/md';
import { SketchPicker } from 'react-color';
import { FaAngleDown } from 'react-icons/fa';
import { AiOutlineEnter } from 'react-icons/ai';

const ProfileEditor = (props) => {
  const [nameValue, setNameValue] = useState(props.currentProfile.name);
  // Title Input State and Ref
  const titleRef = useRef('');
  const [titleValue, setTitleValue] = useState('');
  // Console Input State and Ref
  const consoleRef = useRef('');
  const [consoleValue, setConsoleValue] = useState('');
  // Profile avatar states
  const fileInputRef = useRef('');
  const [imgFile, setImgFile] = useState(null);
  const [changingAvatar, setChangingAvatar] = useState(false);
  // Color states
  const [changingColor, setChangingColor] = useState(false);
  const [color, setColor] = useState('');
  // Genre states
  const genreRef = useRef('');
  const [changingGenre, setChangingGenre] = useState(false);
  const [currentGenre, setCurrentGenre] = useState('');
  const genreList = [
    'Action',
    'Adventure',
    'Arcade',
    'Card & Board',
    'Family',
    'Fighting',
    'Indie',
    'MMO (Massive Multiplayer)',
    'Platformer',
    'Puzzle',
    'Racing',
    'RPG',
    'Shooter',
    'Sports',
    'Strategy',
  ];

  const colorChangeHandler = (color) => setColor(color);
  const genreChangeHandler = (genre) => {
    setCurrentGenre(genre);
    setChangingGenre(false);
  };

  // Determine cancel button functionality
  const cancelButtonHandler = () => {
    // If user is changing avatars, return to editing profile
    if (changingAvatar) {
      setChangingAvatar(false);
    }
    // If the user is editing profile, return to all profiles
    else {
      props.viewAllProfiles();
    }
  };

  // Listen for escape key press to close out color palette
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setChangingColor(false);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  // Listen for clicks outside of genre dropdown box
  useEffect(() => {
    function handleClickOutside(event) {
      if (genreRef.current && !genreRef.current.contains(event.target)) {
        setChangingGenre(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [genreRef]);

  // Avatar profile image handling
  const updateAvatar = (e, method) => {
    const data = new FormData();
    // Append email and profile name to find correct profile to update
    data.append('email', props.userEmail);
    data.append('name', nameValue);
    // User uploads image
    if (method == 'file') {
      data.append('avatar', e.target.files[0]);
      setImgFile(e.target.files[0]);
      axios
        .post('/app/update_profile', data)
        .then((response) => console.log(response));
      setImgFile(null);
    }
    // If user uses a link to an image
    else {
      console.log(e.target);
    }
  };

  const updateProfile = (e) => {
    e.preventDefault();
  };

  return (
    <div className='profile_edit__container'>
      <div className='profile_edit__header'>
        <h3>GAMEFLIX</h3>
      </div>
      <div className='profile_edit__form_wrapper'>
        <h3>
          {props.currentProfile !== true ? 'Edit Profile' : 'Create Profile'}
        </h3>
        <div
          className={`form_container ${
            changingAvatar && 'avatar_select_container'
          }`}
        >
          {/* USER AVATAR CONTAINER */}
          <div
            className={`form_avatar_container ${
              changingAvatar && 'avatar_select'
            }`}
          >
            <img
              className='current_avatar'
              style={{ backgroundColor: props.currentProfile.color }}
              src={`http://localhost:5000/${props.currentProfile.avatar}`}
            />
            {!changingAvatar && (
              <span className='current_avatar_edit'>
                <MdEdit
                  style={{ height: '100%' }}
                  onClick={() => setChangingAvatar(true)}
                />
              </span>
            )}
          </div>
          {/* USER FORM */}
          <div className='form_right'>
            {!changingAvatar && (
              <form className='profile_edit__form'>
                {/* NAME */}
                <input
                  className='name_input'
                  onChange={(e) => setNameValue(e.target.value)}
                  value={nameValue}
                  autoFocus
                />
                {/* COLOR */}
                <p>Color</p>
                <input
                  className='color_input'
                  style={{
                    color: color == '' ? props.currentProfile.color : color,
                    fontWeight: '500',
                  }}
                  defaultValue={props.currentProfile.color}
                />
                <button
                  type='button'
                  onClick={() => setChangingColor(true)}
                  style={{
                    backgroundColor:
                      color == '' ? props.currentProfile.color : color.hex,
                  }}
                />
                {changingColor && (
                  <span
                    onClick={() => setChangingColor(false)}
                    className='close_color_palette'
                  >
                    X
                  </span>
                )}
                {changingColor && (
                  <SketchPicker
                    color={color}
                    onChangeComplete={colorChangeHandler}
                    className='profile_color_palette'
                  />
                )}
              </form>
            )}
            {/* USER PERSONAL */}
            <div
              className={`form_personal ${changingAvatar && 'personal_avatar'}`}
            >
              <h4
                style={{
                  textAlign: changingAvatar ? 'center' : 'left',
                  marginTop: changingAvatar ? '0px' : '10px',
                }}
              >
                {!changingAvatar ? 'Your Playstyle' : 'Current'}
              </h4>
              {/* AVATAR FILE */}
              {changingAvatar && (
                <>
                  <input
                    className='upload_file_input'
                    type='file'
                    accept='image/*'
                    style={{ display: 'none' }}
                    multiple={false}
                    ref={fileInputRef}
                    onChange={(e) => updateAvatar(e, 'file')}
                  />
                  <button onClick={() => fileInputRef.current.click()}>
                    Upload
                  </button>
                  <p>OR</p>
                </>
              )}
              {/* AVATAR URL */}
              {changingAvatar && (
                <>
                  <input
                    className={`console_input ${changingAvatar && 'img_input'}`}
                    placeholder={'Enter link to image or gif'}
                  />
                  <AiOutlineEnter className='link_submit' />
                </>
              )}

              {/* CONSOLE */}
              {!changingAvatar && (
                <>
                  <p className='form_personal_console'>Favorite Console</p>
                  <input
                    ref={titleRef}
                    value={consoleValue}
                    onChange={(e) => {
                      consoleRef.current = consoleValue;
                      setConsoleValue(e.target.value);
                    }}
                    className={`console_input ${changingAvatar && 'img_input'}`}
                    placeholder={
                      changingAvatar ? 'https://www.example.com' : ''
                    }
                  />
                </>
              )}
              {/* TITLE */}
              {!changingAvatar && (
                <>
                  <p className='form_personal_title'>Favorite Title</p>
                  <input
                    ref={titleRef}
                    value={titleValue}
                    className='title_input'
                    onChange={(e) => {
                      titleRef.current = titleValue;
                      setTitleValue(e.target.value);
                    }}
                  />
                </>
              )}
              {/* GENRE */}
              <div className='genre_dropdown'>
                {!changingAvatar && (
                  <>
                    <p className='form_personal_genre'>Favorite Genre</p>
                    <button onClick={() => setChangingGenre(!changingGenre)}>
                      {currentGenre !== '' ? `${currentGenre}` : 'Action'}{' '}
                      <FaAngleDown className='genre_arrow' />
                    </button>
                  </>
                )}
                {/* <FaAngleDown className='genre_arrow' /> */}
                {changingGenre && (
                  <div ref={genreRef} className='genre_dropdown_content'>
                    {genreList.map((genre) => (
                      <span
                        onClick={() => genreChangeHandler(genre)}
                        key={genre}
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* FORM ACTIONS */}
        <div className='form_actions'>
          <button className='save_btn'>Save</button>
          <button className='cancel_btn' onClick={cancelButtonHandler}>
            {!changingAvatar ? 'Cancel' : 'Back'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
