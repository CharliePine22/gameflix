import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import './Authentication.css';
import axios from 'axios';
import LandingPage from '../LandingPage/LandingPage';
import useFetchPopular from '../../hooks/useFetchPopular';

const Authentication = ({ loading, twitchToken, onLogin }) => {
  const allGames = useFetchPopular();
  const [imgsLoading, setImgsLoading] = useState(true);
  const [toLandingPage, setToLandingPage] = useState(false);
  const [authError, setAuthError] = useState('');
  const userLoggedIn = localStorage.getItem('user');
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_BASE_URL;
  const counter = useRef(0);

  useEffect(() => {
    if (userLoggedIn) navigate('/');
  }, []);

  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= allGames.length) {
      setImgsLoading(false);
    }
  };

  const loadedImages = allGames?.map((game) => (
    <React.Fragment key={game.id}>
      <img
        className='login__img'
        src={`//images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover.image_id}.jpg`}
        onLoad={imageLoaded}
      />
    </React.Fragment>
  ));

  const authenticateUser = async (email, password) => {
    try {
      const response = await axios.post(`${baseURL}/authentication/signin`, {
        email,
        password,
      });
      setAuthError('');
      onLogin(response.data.user);
      return response;
    } catch (e) {
      setAuthError(e.response.data.message);
      return e.response.data.message;
    }
  };

  if (loadedImages.length > 0 && !userLoggedIn) {
    if (!toLandingPage)
      return (
        <Login
          images={loadedImages}
          toLanding={() => setToLandingPage(true)}
          authenticateUser={(email, password) =>
            authenticateUser(email, password)
          }
        />
      );

    return (
      <LandingPage
        toSignIn={() => {
          setToLandingPage(false);
        }}
        images={loadedImages}
      />
    );
  } else {
    return (
      <div className='auth_login__loading'>
        <div className='auth_loading_spinner' />
      </div>
    );
  }
};

export default Authentication;
