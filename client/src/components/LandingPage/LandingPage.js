import React, { useEffect, useState, useRef } from 'react';
// File Imports
import './LandingPage.css';
import requests from '../../requests';
import rawgClient from '../../axios';
// Package Imports
import { FaAngleRight } from 'react-icons/fa';
import ReactPlayer from 'react-player/lazy';
// Asset Imports
import pcScreen from '../../assets/images/computer_screen.png';
import demoVideo from '../../assets/videos/gameflix-demo.webm';
import tvScreen from '../../assets/images/retro-tv.png';
import ff7Cloud from '../../assets/images/ff7-cloud.png';
import mario from '../../assets/images/mario.png';
import masterChief from '../../assets/images/master-chief.png';
import lozLink from '../../assets/images/loz-link.png';
import spyro from '../../assets/images/spyro.png';
import logos from '../../assets/images/console-logos.jpg';
import NewUser from './NewUser/NewUser';

const LandingPage = (props) => {
  const [gameList, setGameList] = useState([]);
  const [imgsLoading, setImgsLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [creatingNewUser, setCreatingNewUser] = useState(false);

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

  // If there is a value in the input field, leave placeholder above value
  const inputBlurHandler = () => {
    if (signUpRef.current.value !== '') {
      return;
    } else {
      setInputFocused(setInputFocused(false));
    }
  };

  const toLoginHandler = () => {
    props.toSignIn();
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const email = signUpRef.current.value.toLowerCase().trim();
    setCreatingNewUser(true);
    // signUpRef.current.value = '';
  };

  const toWelcomeScreen = (email, password) => {
    props.loginAuthentication(email, password);
    props.toSignIn();
  };

  if (creatingNewUser) {
    return (
      <NewUser
        toWelcomeScreen={toWelcomeScreen}
        email={signUpRef.current?.value}
      />
    );
  }

  return (
    <div className='landing_page'>
      {/* BANNER */}
      <div className='landing_banner'>
        <div className='landing_banner__fade_top' />
        <div className='landing_nav'>
          <div className='nav_left'>
            <h3 className='nav_badge'>GAMEFLIX</h3>
          </div>
          <div className='nav_right'>
            <button className='sign_in_btn' onClick={toLoginHandler}>
              Sign In
            </button>
          </div>
        </div>
        <div className='landing_banner__content'>
          <h1>
            Looking for a big title, a taste of nostalgia, or a hidden gem?
          </h1>
          <h3>Watch trailers. Listen to OSTs.</h3>
          <p>
            Discover your favorites plus thousands more! Enter your email to get
            started.
          </p>
          <form className='landing__form' onSubmit={formSubmitHandler}>
            <input
              type='email'
              ref={signUpRef}
              onFocus={() => setInputFocused(true)}
              onBlur={inputBlurHandler}
            />
            <span
              className={`email_placeholder ${inputFocused && 'email_focused'}`}
            >
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
      {/* DEMO */}
      <div className='landing__demo'>
        <div className='demo_left'>
          <h1 className='demo_left_title'>Endless Choices</h1>
          <p className='demo_left_description'>
            Endless titles. Endless hours. Endless oppurtunities.
          </p>
        </div>
        <div className='demo_right'>
          <div className='demo_video_container'>
            <ReactPlayer
              url={demoVideo}
              className='demo_video'
              playing={true}
              muted={true}
              loop={true}
            />
          </div>
          <img src={pcScreen} className='demo_pc_img' />
        </div>
      </div>
      {/* RETRO */}
      <div className='landing__information'>
        <div className='information_left'>
          <img src={tvScreen} className='information_tv_img' />
          <div className='information_characters'>
            <img className='chief-img' src={masterChief} />
            <img className='cloud-img' src={ff7Cloud} />
            <img className='mario-img' src={mario} />
            <img className='link-img' src={lozLink} />
            <img className='spyro-img' src={spyro} />
          </div>
        </div>
        <div className='information_right'>
          <h1 className='information_right_title'>
            Reexperience your Childhood
          </h1>
          <p className='information_right_description'>
            Rediscover lost loves and relive your nostalgic glory days.
          </p>
        </div>
      </div>
      {/* PROFILE */}
      <div className='landing__profiles'>
        <div className='profiles__left'>
          <h1 className='profiles__left_title'>Gaming your Way</h1>
          <p className='profiles__left_description'>
            Discover multiple games from your favorite genres, publishers, or
            consoles.
          </p>
        </div>
        <div className='profiles__right'>
          <img
            className='profiles__logo_collection'
            src={logos}
            alt='a collection of different video game console logos'
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
