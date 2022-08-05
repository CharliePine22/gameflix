import React, { useRef } from 'react';
import './Nav.css';
import logo from '../../assets/images/gameflix-logo.png';
import avatar from '../../assets/images/roxas-icon.png';
import { useEffect, useState } from 'react';
import { FaSistrix, FaAngleUp } from 'react-icons/fa';
import NavDropdown from './NavDropdown';

function Nav(props) {
  const [displayNav, setDisplayNav] = useState(false);
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const searchRef = useRef('');

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
    console.log(searchValue);
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
      <img className='nav__logo' src={logo} alt='GameFlix Logo' />
      <div className='nav__right'>
        <div className='nav__search'>
          {displaySearch && (
            <form className='nav__search_form' onSubmit={formSubmitHandler}>
              <input
                ref={searchRef}
                autoFocus
                type='text'
                placeholder='Titles, publishers, genres'
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
            <img className='nav__avatar' src={avatar} alt="User's avatar" />
          </div>
          <FaAngleUp className='nav__avatar_arrow' />
          {/* <NavDropdown /> */}
          {displayDropdown && (
            <NavDropdown
              logoutHandler={props.onLogout}
              closeNavDropdown={closeNavDropdown}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
