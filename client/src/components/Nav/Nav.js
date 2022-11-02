import React, { useRef } from 'react';
import './Nav.css';
import logo from '../../assets/images/gameflix-logo.png';
import { useEffect, useState } from 'react';
import { FaSistrix, FaAngleUp } from 'react-icons/fa';
import NavDropdown from './NavDropdown';
import ProfileEditor from '../Login/Profiles/ProfileEditor/ProfileEditor';
import AccountEditor from '../Login/Profiles/ProfileEditor/AccountEditor';

function Nav(props) {
  const [displayNav, setDisplayNav] = useState(false);
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const searchRef = useRef('');
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingAccount, setEditingAccount] = useState(false);

  const profile = props.activeProfile;

  const closeNavDropdown = () => {
    setDisplayDropdown(false);
  };

  const closeSearch = () => {
    if (searchRef.current.value.length > 0) {
      return;
    }
    setDisplaySearch(false);
  };

  const determineSearch = () => {
    if (searchRef.current.value == 0) {
      props.closeSearchResults();
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const searchValue = searchRef.current.value.trim();
    if (searchValue.length == 0) return;
    props.fetchSubmittedGame(searchValue);
  };

  useEffect(() => {
    // If the user scrolls down from the top of page, add a black background to the nav
    const scrollNavListener = () => {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          setDisplayNav(true);
        } else setDisplayNav(false);
      });
    };
    scrollNavListener();

    return () => {
      window.removeEventListener('scroll', scrollNavListener);
    };
  }, []);

  const cancelEdit = () => {
    document.body.style.overflowY = 'scroll';
    setEditingProfile(false);
    setEditingAccount(false);
  };

  const editProfileHandler = () => {
    document.body.style.overflowY = 'hidden';
    setEditingProfile(true);
  };

  const editAccountHandler = () => {
    document.body.style.overflowY = 'hidden';
    setEditingAccount(true);
  };

  const saveEdit = () => {
    props.saveEdit();
    setEditingProfile(false);
  };

  // Handles escape key press for search input
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        // If the search input is open, close it
        setDisplaySearch(false);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className={`nav ${displayNav && 'nav__hide'}`}>
      {editingProfile && (
        <div className='nav_edit_profile'>
          <ProfileEditor
            currentProfile={profile}
            userEmail={props.currentUser.email}
            viewAllProfiles={cancelEdit}
            saveEdit={saveEdit}
            getProfile={(test) => props.selectProfile(test)}
            twitchToken={props.twitchToken}
          />
        </div>
      )}
      {editingAccount && (
        <div className='nav_edit_profile'>
          {' '}
          <AccountEditor
            closeAccountSettings={cancelEdit}
            setLoggedUser={(user) => props.setLoggedUser(user)}
            currentUser={props.currentUser}
          />{' '}
        </div>
      )}
      <img
        className='nav__logo'
        src={logo}
        alt='GameFlix Logo'
        onClick={() => (window.location = '/')}
      />
      <div className='nav__right'>
        <div className='nav__search'>
          {displaySearch && (
            <form className='nav__search_form' onSubmit={formSubmitHandler}>
              <input
                ref={searchRef}
                autoFocus
                type='text'
                placeholder='Titles, publishers, genres'
                defaultValue={
                  props.searchedGame ? `${props.searchedGame.name}` : ''
                }
                onBlur={closeSearch}
                onChange={determineSearch}
              />
            </form>
          )}
          <FaSistrix
            className={`nav__search_icon ${displaySearch && 'search_active'}`}
            onClick={() => setDisplaySearch(!displaySearch)}
          />
        </div>
        <div
          className='nav__actions'
          onMouseLeave={() => setDisplayDropdown(false)}
        >
          <div
            className='nav__avatar_container'
            onMouseOver={() => setDisplayDropdown(true)}
          >
            <img
              className='nav__avatar'
              src={profile.avatar}
              // style={{ backgroundColor: profile.color }}
              alt="User's avatar"
            />
          </div>
          <FaAngleUp
            className='nav__avatar_arrow'
            style={{
              transform: `${
                displayDropdown ? 'rotate(180deg)' : 'rotate(0deg)'
              }`,
            }}
          />
          {/* <NavDropdown /> */}
          {displayDropdown && (
            <NavDropdown
              changeProfile={props.changeUser}
              activeProfile={profile}
              allProfiles={props.currentUser.profiles}
              logoutHandler={props.onLogout}
              closeNavDropdown={closeNavDropdown}
              toProfilePage={props.toProfilePage}
              spotifyToken={props.spotifyToken}
              editProfile={editProfileHandler}
              editAccount={editAccountHandler}
              updateCollection={props.updateCollection}
              currentCollection={props.currentCollection}
              viewCollection={props.viewCollection}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
