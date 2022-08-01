import React, { useState, useEffect, useRef } from 'react';
import './Login.css';
import gameflixBrand from '../../assets/images/gameflix-brand.png';
import requests from '../../requests';
import rawgClient from '../../axios';
import loginAudio from '../../assets/sounds/success.wav';

const Login = () => {
  const [gameList, setGameList] = useState([]);
  const emailRef = useRef();
  const passwordRef = useRef();
  let audio = new Audio(loginAudio);

  // Fetch games to display and create background image
  useEffect(() => {
    async function fetchData() {
      const request = await rawgClient.get(requests[2].url + '&page_size=40');
      setGameList(request.data.results);
      return request;
    }
    fetchData();
  }, []);

  // Submit user information to match authentication
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    audio.play();

    console.log(email, password);
  };

  return (
    <div className='login__wrapper'>
      <div className='login'>
        <img src={gameflixBrand} className='login__brand' />
        <div className='login__form_wrapper'>
          <div className='login__form_container'>
            <h1>Sign In</h1>
            <form className='login__form' onSubmit={formSubmitHandler}>
              <div className='login__form_actions'>
                <label className='form_label' htmlFor='email'>
                  Email
                </label>
                <input
                  ref={emailRef}
                  className='form_input'
                  type='email'
                  placeholder='joeschmo@email.com'
                />
              </div>
              <div className='login__form_actions'>
                <label className='form_label' htmlFor='email'>
                  Password
                </label>
                <input
                  ref={passwordRef}
                  className='form_input'
                  type='password'
                  placeholder='Password'
                />
              </div>
              <button className='form__submit_btn'>Sign In</button>
              <p className='form__create_account'>
                Don't have an account? <span>Create one now</span>.
              </p>
            </form>
          </div>
        </div>
      </div>
      <div className='login__background'>
        {gameList.map((game) => (
          <img
            key={game?.name}
            className='login__img'
            src={game?.background_image}
          />
        ))}
      </div>
    </div>
  );
};

export default Login;
