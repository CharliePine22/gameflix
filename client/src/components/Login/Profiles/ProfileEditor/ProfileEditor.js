import React, { useRef, useState, useEffect } from 'react';
import './ProfileEditor.css';
import { MdEdit } from 'react-icons/md';
import { SketchPicker } from 'react-color';
import { FaAngleDown } from 'react-icons/fa';

const ProfileEditor = (props) => {
  const nameRef = useRef('');
  const titleRef = useRef('');
  // Profile avatar states
  const [changingAvatar, setChangingAvatar] = useState(false);
  // Color states
  const [changingColor, setChangingColor] = useState(false);
  const [color, setColor] = useState('');
  // Genre states
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
            {/* NAME AND COLOR */}
            {!changingAvatar && (
              <form className='profile_edit__form'>
                <input
                  className='name_input'
                  ref={nameRef}
                  autoFocus
                  defaultValue={props.currentProfile.name}
                />
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
              <h4 style={{ textAlign: changingAvatar ? 'center' : 'left' }}>
                {!changingAvatar ? 'Your Playstyle' : 'Current Avatar'}
              </h4>
              {changingAvatar && (
                <>
                  <input className='upload_file_input' type='file' />
                  <p>OR</p>
                </>
              )}
              {/* CONSOLE */}
              <p className='form_personal_console'>
                {!changingAvatar ? 'Favorite Console' : 'Image URL'}
              </p>
              <input
                className={`console_input ${changingAvatar && 'img_input'}`}
                placeholder={changingAvatar && 'https://www.example.com'}
              />
              {/* TITLE */}
              {!changingAvatar && (
                <>
                  <p className='form_personal_title'>Favorite Title</p>
                  <input className='title_input' />
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
                  <div className='genre_dropdown_content'>
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
          <button className='cancel_btn' onClick={props.viewAllProfiles}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
