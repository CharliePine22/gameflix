import React, { useEffect, useState, useRef } from 'react';
import './LandingPage.css';
import requests from '../../requests';
import rawgClient from '../../axios';
import { FaAngleRight } from 'react-icons/fa';

const LandingPage = () => {
  const [gameList, setGameList] = useState([]);
  const [imgsLoading, setImgsLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const counter = useRef(0);
  const signUpRef = useRef('');
  // Regex for email validity
  const re =
    /^(([^ <>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Helper function to render all images when they're loaded
  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= gameList.length) {
      setImgsLoading(false);
    }
  };

  // Fetch games to display and create background image
  useEffect(() => {
    async function fetchData() {
      const request = await rawgClient.get(requests[2].url + '&page_size=40');
      setGameList(request.data.results);
      return request;
    }
    fetchData();
  }, []);

  const inputBlurHandler = () => {
    if (signUpRef.current.value !== '') {
      return;
    } else {
      setInputFocused(setInputFocused(false));
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const email = signUpRef.current.value.toLowerCase().trim();
    signUpRef.current.value = '';
  };

  return (
    <div className='landing_page'>
      {/* Banner */}
      <div className='landing_banner'>
        <div className='landing_banner__fade_top' />
        <div className='landing_nav'>
          <div className='nav_left'>
            <h3 className='nav_badge'>GAMEFLIX</h3>
          </div>
          <div className='nav_right'>
            <button className='sign_in_btn'>Sign In</button>
          </div>
        </div>
        <div className='landing_banner__content'>
          <h1>
            Looking for a big title, a taste of nostalgia, or a hidden gem?
          </h1>
          <h3>Find old or new games.</h3>
          <p>Discover your favorites and thousands more now!</p>
          <form className='landing__form' onSubmit={formSubmitHandler}>
            <input
              type='email'
              ref={signUpRef}
              onFocus={() => setInputFocused(true)}
              onBlur={inputBlurHandler}
            />
            <span className={`email_placeholder ${inputFocused && 'focused'}`}>
              Email address
            </span>
            <button>
              Get Started <FaAngleRight className='btn_arrow' />
            </button>
          </form>
        </div>
        <div className='landing_banner__background'>
          {gameList.map((game) => (
            <React.Fragment key={game.name}>
              <span className='landing_banner__name'>
                {game?.name.split(':')[0]}
              </span>
              <img
                className='landing_banner__img'
                src={game?.background_image}
                onLoad={imageLoaded}
              />
            </React.Fragment>
          ))}
        </div>
        <div className='landing_banner__fade_bottom' />
      </div>
      {/* Demo */}
      <div className='landing_page__demo'></div>
    </div>
  );
};

export default LandingPage;
