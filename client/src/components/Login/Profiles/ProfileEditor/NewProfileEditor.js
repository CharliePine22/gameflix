import React, { useState, useRef, useEffect } from 'react';
import defaultAvatar from '../../../../assets/images/basic_avatar.png';
import { SketchPicker } from 'react-color';
import { FaAngleDown } from 'react-icons/fa';
import axios from 'axios';
import './ProfileEditor.css';
import { FaCloudUploadAlt, FaLink } from 'react-icons/fa';

const NewProfileEditor = (props) => {
  // Color states
  const [changingColor, setChangingColor] = useState(false);
  const [color, setColor] = useState('');
  // Form States
  const [error, setError] = useState('');
  const [hasError, setHasError] = useState(false);
  const [typeError, setTypeError] = useState(null);
  const [nameValue, setNameValue] = useState('');
  const [consoleValue, setConsoleValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  // Avatar States
  const [currentAvatar, setCurrentAvatar] = useState(null);
  const [imageLink, setImageLink] = useState('');
  const [usingLink, setUsingLink] = useState(false);
  const fileInputRef = useRef('');
  // Genre Input States
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

  const colorChangeHandler = (color) => setColor(color.hex);
  const genreChangeHandler = (genre) => {
    setCurrentGenre(genre);
    setChangingGenre(false);
  };
  const imageLinkHandler = (e) => {
    setCurrentAvatar(imageLink);
    setUsingLink(false);
  };

  const uploadProfileAvatarHandler = (e, method) => {
    if (method == 'file') {
      setCurrentAvatar(URL.createObjectURL(e.target.files[0]));
    } else {
      setUsingLink(true);
    }
  };

  const saveUserData = async (e) => {
    e.preventDefault();

    if (nameValue.trim() == '') {
      setHasError(true);
      setError('Please enter a valid name!');
      return;
    } else if (consoleValue.trim() == '') {
      setHasError(true);
      setError('Please enter a valid game console!');
    }

    const userData = {
      email: props.userEmail,
      avatar: currentAvatar,
      name: nameValue.trim(),
      color: color,
      favoriteGenre: currentGenre.trim(),
      favoriteGame: titleValue.trim(),
      favoriteConsole: consoleValue.trim(),
    };

    try {
      const request = await axios.post('/app/create_new_profile', userData);
      console.log(request.data);
      props.updateUser();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {/* MODAL */}
      <div
        className={`avatar_link_modal ${usingLink == false && 'modal_hidden'}`}
      >
        <h3>Avatar Link</h3>
        <div className='modal_content'>
          <p>Please enter the link to any image or gif below.</p>

          <div className='modal_form'>
            <input
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
            />
            <button onClick={imageLinkHandler}>Submit</button>
            <button onClick={() => setUsingLink(false)}>Back</button>
          </div>
        </div>
      </div>
      {/* PROFILE EDIT CONTAINER */}
      <div
        className='profile_edit__container'
        style={{ opacity: usingLink && '.25' }}
      >
        <div className='profile_edit__header'>
          <h3>GAMEFLIX</h3>
        </div>
        <div className='profile_edit__form_wrapper'>
          <h3>Create Profile</h3>
          <div className='form_container'>
            {/* USER AVATAR CONTAINER */}
            <div className='form_avatar_container'>
              {/* AVATAR IMAGE */}
              <img
                style={{
                  backgroundColor: color == '' ? '#FFF' : color,
                  objectFit: 'cover',
                }}
                className='current_avatar'
                src={currentAvatar == null ? defaultAvatar : currentAvatar}
              />
              {/* AVATAR IMAGE ACTIONS */}
              <div className='profile_avatar_actions'>
                {/* File Upload */}
                <span className='avatar_file_option'>
                  <input
                    className='upload_file_input'
                    type='file'
                    accept='image/*'
                    style={{ display: 'none' }}
                    multiple={false}
                    ref={fileInputRef}
                    onChange={(e) => uploadProfileAvatarHandler(e, 'file')}
                  />
                  <FaCloudUploadAlt
                    onClick={(e) => fileInputRef.current.click()}
                  />
                </span>
                {/* Link Upload */}
                <span className='avatar_link_option'>
                  <FaLink onClick={(e) => uploadProfileAvatarHandler('link')} />
                </span>
              </div>
            </div>
            {/* USER FORM */}
            <div className='form_right'>
              <form className='profile_edit__form'>
                {/* NAME */}
                <input
                  className='name_input'
                  placeholder='Name'
                  onChange={(e) => {
                    setNameValue(e.target.value);
                    setHasError(false);
                  }}
                  value={nameValue}
                  autoFocus
                />
                {/* COLOR */}
                <p>Color</p>
                <input
                  className='color_input'
                  style={{
                    color: color,
                    fontWeight: '500',
                  }}
                  onChange={(e) => setColor(e.target.value)}
                  value={color}
                />
                <button
                  type='button'
                  onClick={() => setChangingColor(!changingColor)}
                  style={{
                    backgroundColor: color,
                  }}
                />
                {changingColor && (
                  <SketchPicker
                    color={color}
                    onChangeComplete={colorChangeHandler}
                    className='profile_color_palette'
                  />
                )}
              </form>
              {/* USER PERSONAL */}
              <div className='form_personal'>
                <h4>Your Playstyle</h4>

                {/* CONSOLE */}
                <p className='form_personal_console'>Favorite Console</p>
                <input
                  value={consoleValue}
                  onChange={(e) => {
                    setConsoleValue(e.target.value);
                  }}
                  className='console_input'
                />

                {/* TITLE */}
                <p className='form_personal_title'>Favorite Title</p>
                <input
                  value={titleValue}
                  className='title_input'
                  onChange={(e) => {
                    setTitleValue(e.target.value);
                  }}
                />

                {/* GENRE */}
                <div className='genre_dropdown'>
                  <p className='form_personal_genre'>Favorite Genre</p>
                  <button onClick={() => setChangingGenre(!changingGenre)}>
                    {currentGenre !== '' ? `${currentGenre}` : 'Action'}{' '}
                    <FaAngleDown className='genre_arrow' />
                  </button>
                  {/* GENRE DROPDOWN */}
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
            <button className='save_btn' onClick={saveUserData}>
              Save
            </button>
            <button className='cancel_btn' onClick={props.viewAllProfiles}>
              Cancel
            </button>
          </div>
          {hasError && <p className='create_profile_error'>{error}</p>}
        </div>
      </div>
    </>
  );
};

export default NewProfileEditor;
