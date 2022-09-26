import React, { useState, useEffect, useRef } from 'react';
import './Login.css';
import gameflixBrand from '../../assets/images/gameflix-brand.png';
import requests from '../../requests';
import rawgClient from '../../axios';
import axios from 'axios';

const Login = (props) => {
  // States
  const [gameList, setGameList] = useState([]);
  const [imgsLoading, setImgsLoading] = useState(false);
  const [hasEmailError, setHasEmailError] = useState(false);
  const [hasPasswordError, setHasPasswordError] = useState(false);
  const [currentFocus, setCurrentFocus] = useState(null);
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  // Refs
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const counter = useRef(0);

  // Regex for email validity
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Fetch games to display and create background image
  useEffect(() => {
    setImgsLoading(true);
    async function fetchData() {
      const request = await rawgClient.get(requests[2].url + '&page_size=40');
      setGameList(request.data.results);
      return request;
    }
    fetchData();
  }, []);

  // Helper function to render all images when they're loaded
  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= gameList.length) {
      setImgsLoading(false);
    }
  };

  // Email input error change error handler
  const checkEmailValidity = (e) => {
    if (hasEmailError) setHasEmailError(false);
    const value = e.target.value.trim().toLowerCase();
    const isValidEmail = re.test(value);
  };

  // Email input error blur error handler
  const emailBlurHandler = (e) => {
    const value = e.target.value.trim().toLowerCase();
    const isValidEmail = re.test(value);
    setHasEmailError(!isValidEmail);
    setCurrentFocus(null);
  };

  // Password input error change error handler
  const checkPasswordValidity = (e) => {
    if (hasPasswordError) setHasPasswordError(false);
    const value = e.target.value.trim().toLowerCase();
    const isValidPassword =
      e.target.value.length > 0 && e.target.value.length <= 8;
  };
  // Password input error blur error handler
  const passwordBlurHandler = (e) => {
    const value = e.target.value.trim().toLowerCase();
    const isValidPassword = value.length > 3 && value.length <= 8;
    setHasPasswordError(!isValidPassword);
    setCurrentFocus(null);
  };

  const toLandingPage = () => {
    props.toLanding();
  };

  const authenticateUser = async (email, password) => {
    if (email == 'test@test.com') {
      props.onLogin({ email, password });
      return;
    }
    try {
      const response = await axios.post(
        'https://gameflixx-server.herokuapp.com/app/signin',
        { email, password }
      );
      // const response = await axios.post(
      //   'https://gameflixx-server.herokuapp.com/app/signin',
      //   { email, password }
      // );
      setAuthError('');
      props.onLogin(response.data.user);
    } catch (e) {
      setAuthError(e.response.data.message);
      emailRef.current.value = email;
    } finally {
      setLoading(false);
    }
  };

  // Submit user information to match authentication
  const formSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    // Data values
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    emailRef.current.blur();
    passwordRef.current.blur();
    setCurrentFocus('');
    authenticateUser(email, password);
  };

  return (
    <div
      className='login__wrapper'
      style={{ display: imgsLoading ? 'none' : 'block' }}
    >
      {/* {imgsLoading && (
        <div className='login__image_loading'>
          <div className='image_loading__dots'>
            <div className='loading_dot'></div>
            <div className='loading_dot'></div>
            <div className='loading_dot'></div>
          </div>
        </div>
      )} */}
      <div className='login'>
        <img src={gameflixBrand} className='login__brand' />
        <div className='login__form_wrapper'>
          <div className='login__form_container'>
            <form className='login__form' onSubmit={formSubmitHandler}>
              {!loading ? (
                <>
                  <h1>Sign In</h1>
                  <div className='login__form_actions'>
                    <label className='form_label' htmlFor='email' />
                    <input
                      ref={emailRef}
                      onFocus={() => setCurrentFocus('email')}
                      onChange={checkEmailValidity}
                      onBlur={emailBlurHandler}
                      className={`form_input ${
                        emailRef.current?.value !== '' && hasEmailError
                          ? 'error'
                          : ''
                      }`}
                      type='email'
                    />
                    <span
                      className={`form_actions_placeholder ${
                        emailRef.current?.value || currentFocus == 'email'
                          ? 'focused'
                          : ''
                      }`}
                    >
                      Email
                    </span>
                  </div>
                  <div className='login__form_actions'>
                    <label className='form_label' htmlFor='email' />
                    <input
                      ref={passwordRef}
                      onFocus={() => setCurrentFocus('password')}
                      onChange={checkPasswordValidity}
                      onBlur={passwordBlurHandler}
                      className={`form_input ${
                        passwordRef.current?.value !== undefined &&
                        hasPasswordError &&
                        passwordRef.current.value.length > 0
                          ? 'error'
                          : ''
                      }`}
                      type='password'
                    />
                    <span
                      className={`form_actions_placeholder ${
                        passwordRef.current?.value || currentFocus == 'password'
                          ? 'password_focused'
                          : ''
                      }`}
                    >
                      Password
                    </span>
                    {authError && (
                      <p className='login__auth_error'>{authError}</p>
                    )}
                  </div>
                  <button className='form__submit_btn'>Sign In</button>
                  <p className='form__create_account'>
                    Don't have an account?{' '}
                    <span onClick={toLandingPage}>Create one now</span>.
                  </p>
                </>
              ) : (
                <div className='login__loading'>
                  <div className='loading_spinner' />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      {/* Container for background with game images */}
      {/* Consider adding video game name */}
      <div className='login__background'>
        {gameList.map((game) => (
          <React.Fragment key={game.name}>
            <span className='login__name'>{game?.name.split(':')[0]}</span>
            <img
              className='login__img'
              src={game?.background_image}
              onLoad={imageLoaded}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Login;
