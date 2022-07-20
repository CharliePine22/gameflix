import React from 'react';
import './Nav.css';
import logo from '../../assets/images/gameflix-logo.png';
import avatar from '../../assets/images/roxas-icon.png';
import { useEffect, useState } from 'react';

function Nav() {
  const [displayNav, setDisplayNav] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setDisplayNav(true);
      } else setDisplayNav(false);
    });

    return () => {
      window.removeEventListener('scroll');
    };
  }, []);

  return (
    <div className={`nav ${displayNav && 'nav__hide'}`}>
      <img className='nav__logo' src={logo} alt='GameFlix Logo' />
      <div className='nav__avatar_container'>
        <img className='nav__avatar' src={avatar} alt="User's avatar" />
      </div>
    </div>
  );
}

export default Nav;
