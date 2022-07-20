import React from 'react';
import './Nav.css';
import logo from '../../assets/images/gameflix-logo.png';
import avatar from '../../assets/images/roxas-icon.png';
import { useEffect, useState } from 'react';
import { FaSistrix, FaAngleUp } from 'react-icons/fa';
import NavDropdown from './NavDropdown';

function Nav() {
  const [displayNav, setDisplayNav] = useState(false);
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);

  useEffect(() => {
    // If the user scrolls down from the top, add a black background to the nav
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

  return (
    <div className={`nav ${displayNav && 'nav__hide'}`}>
      <img className='nav__logo' src={logo} alt='GameFlix Logo' />
      <div className='nav__right'>
        <div className='nav__search'>
          {displaySearch && (
            <form className='nav__search_form'>
              <input type='text' placeholder='Titles, publishers, genres' />
            </form>
          )}
          <FaSistrix
            className={`nav__search_icon ${displaySearch && 'search_active'}`}
            onClick={() => setDisplaySearch(!displaySearch)}
          />
        </div>
        <div className='nav__actions'>
          <div
            className='nav__avatar_container'
            onMouseOver={() => setDisplayDropdown(true)}
            onMouseLeave={() => setDisplayDropdown(false)}
          >
            <img className='nav__avatar' src={avatar} alt="User's avatar" />
          </div>
          <FaAngleUp className='nav__avatar_arrow' />
          {/* <NavDropdown /> */}
          {displayDropdown && <NavDropdown />}
        </div>
      </div>
    </div>
  );
}

export default Nav;
