import React, { useRef, useState, useEffect } from 'react';
import './ProfileEditor.css';
import axios from 'axios';
import { MdEdit } from 'react-icons/md';
import { SketchPicker } from 'react-color';
import { FaAngleDown } from 'react-icons/fa';

const ProfileEditor = (props) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const currentProfile = props.currentProfile;
  const isAdmin = currentProfile.isAdmin;
  const [loading, setLoading] = useState(false);
  // Current Profile Name
  const [nameValue, setNameValue] = useState(currentProfile.name);
  // Title Input State and Ref
  const titleRef = useRef('');
  const [titleValue, setTitleValue] = useState(currentProfile.favorite_game);
  // Console Input State and Ref
  const consoleRef = useRef('');
  const [consoleValue, setConsoleValue] = useState(
    currentProfile.favorite_console
  );
  // Profile form states
  const [statusMessage, setStatusMessage] = useState('');
  const [currentAvatar, setCurrentAvatar] = useState(currentProfile.avatar);
  const [imgFilePreview, setImgFilePreview] = useState(null);
  const fileInputRef = useRef('');
  const [imgLink, setImgLink] = useState('');
  const [usingImgLink, setUsingImgLink] = useState(false);
  const [changingAvatar, setChangingAvatar] = useState(false);
  // Color states
  const [changingColor, setChangingColor] = useState(false);
  const [color, setColor] = useState(currentProfile.color);
  // Genre states
  const genreRef = useRef('');
  const [changingGenre, setChangingGenre] = useState(false);
  const [currentGenre, setCurrentGenre] = useState(
    currentProfile.favorite_genre
  );
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

  const colorChangeHandler = (color) => setColor(color.hex);
  const genreChangeHandler = (genre) => {
    setCurrentGenre(genre);
    setChangingGenre(false);
  };

  // Determine cancel button functionality
  const cancelButtonHandler = () => {
    // If user is changing avatars, return to editing profile
    if (changingAvatar) {
      setChangingAvatar(false);
      setUsingImgLink(false);
    }
    // If the user is editing profile, return to all profiles
    else {
      props.viewAllProfiles();
    }
  };

  // Delete single profile
  const deleteProfileHandler = async () => {
    setLoading(true);
    try {
      const request = await axios.delete(`${baseURL}/app/delete_profile`, {
        data: { email: props.userEmail, name: currentProfile.name },
      });
      console.log(request);
      props.saveEdit();
      props.viewAllProfiles();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
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
  const updateAvatar = async (e, method) => {
    setLoading(true);
    // Append email and profile name to find correct profile to update
    const data = new FormData();
    data.append('email', props.userEmail);
    data.append('name', currentProfile.name);
    // User uploads image
    if (method == 'file') {
      data.append('avatar', e.target.files[0]);
      try {
        const request = await axios.post(
          `${baseURL}/app/update_avatar_file`,
          data
        );
        setCurrentAvatar(URL.createObjectURL(e.target.files[0]));
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }

    // If user uses a link to an image
    else {
      const data = {
        email: props.userEmail,
        name: currentProfile.name,
        avatar: imgLink,
      };
      try {
        const request = await axios.post(
          `${baseURL}/app/update_avatar_link`,
          data
        );
        console.log(request.data);
        setCurrentAvatar(imgLink);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }
  };

  // If user isn't using the link, display the link modal
  // Or else submit the link url and close the modal
  const determineLinkAction = (e) => {
    if (!usingImgLink) {
      setUsingImgLink(true);
    } else {
      updateAvatar(e, 'link');
    }
  };

  // Update Profile in Mongo Database
  const saveUserData = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Make inputs OPTIONAL
    const userData = {
      email: props.userEmail,
      originalName: currentProfile.name,
      newName: nameValue.trim(),
      newColor: color,
      favoriteGenre: currentGenre.trim(),
      favoriteGame: titleValue.trim(),
      favoriteConsole: consoleValue.trim(),
    };

    try {
      const request = await axios.post(
        `${baseURL}/app/update_user_profile`,
        userData
      );
      localStorage.setItem('user', JSON.stringify(request.data.response));
      setStatusMessage(request.data.message);
      props.saveEdit();
      props.viewAllProfiles();
    } catch (error) {
      setStatusMessage(error);
    }
    setLoading(false);
  };

  // Loading spinner
  if (loading) {
    return (
      <div className='profile_edit__container'>
        <div className='profile_edit__header'>
          <h3>GAMEFLIX</h3>
        </div>
        <div className='profile_edit__form_wrapper'>
          <div className='profile__loading'>
            <div className='profile__loading_spinner' />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='profile_edit__container'>
      <div className='profile_edit__header'>
        <h3>GAMEFLIX</h3>
      </div>
      <div className='profile_edit__form_wrapper'>
        <h3>{currentProfile !== true ? 'Edit Profile' : 'Create Profile'}</h3>
        <div
          className={`form_container ${
            changingAvatar && 'avatar_select_container'
          }`}
        >
          {/* USER AVATAR CONTAINER */}
          <div
            style={{ paddingTop: changingAvatar && '10px' }}
            className='form_avatar_container'
          >
            <img
              className={`current_avatar ${changingAvatar && 'avatar_select'}`}
              style={{
                backgroundColor: color ? color : currentProfile.color,
              }}
              src={currentAvatar}
            />
            {!changingAvatar && (
              <span
                className='current_avatar_edit'
                onClick={() => setChangingAvatar(true)}
              >
                <MdEdit style={{ height: '100%' }} />
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
                    color: color,
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
            )}
            {/* USER PERSONAL */}
            <div
              className={`form_personal ${changingAvatar && 'personal_avatar'}`}
            >
              <h4
                style={{
                  textAlign: changingAvatar ? 'center' : 'left',
                }}
              >
                {!changingAvatar ? 'Your Playstyle' : 'Current'}
              </h4>
              {/* AVATAR FILE */}
              {changingAvatar && (
                <>
                  <div
                    className={`upload_avatar_actions ${
                      usingImgLink && 'img_link_actions'
                    }`}
                  >
                    <input
                      className='upload_file_input'
                      type='file'
                      accept='image/*'
                      style={{ display: 'none' }}
                      multiple={false}
                      ref={fileInputRef}
                      onChange={(e) => updateAvatar(e, 'file')}
                    />

                    {!usingImgLink && (
                      <>
                        <button onClick={() => fileInputRef.current.click()}>
                          Upload
                        </button>
                        <p>OR</p>
                      </>
                    )}
                    {/* AVATAR URL */}
                    <button onClick={determineLinkAction}>
                      {!usingImgLink ? 'Enter link' : 'Submit'}
                    </button>
                    {usingImgLink && (
                      <input
                        className={`console_input ${
                          changingAvatar && 'img_input'
                        }`}
                        placeholder={'Enter link to image or gif'}
                        value={imgLink}
                        onChange={(e) => setImgLink(e.target.value)}
                      />
                    )}
                  </div>
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
                      {currentGenre !== undefined
                        ? `${currentGenre}`
                        : 'Action'}{' '}
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
          {!changingAvatar && (
            <button className='save_btn' onClick={saveUserData}>
              Save
            </button>
          )}
          <button className='cancel_btn' onClick={cancelButtonHandler}>
            {!changingAvatar ? 'Cancel' : 'Back'}
          </button>
          {!isAdmin && (
            <button
              className='delete_profile_btn justify-start'
              onClick={deleteProfileHandler}
            >
              Delete Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
