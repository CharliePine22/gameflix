import React, { useState, useEffect, useRef } from 'react';
import Login from '../Login/Login';
import './Authentication.css';

import axios from 'axios';

const Authentication = ({ loading, twitchToken }) => {
  const [gameList, setGameList] = useState([]);
  const [imgsLoading, setImgsLoading] = useState(true);
  const [toLandingPage, setToLandingPage] = useState(false);
  const [authError, setAuthError] = useState('');

  const baseURL = process.env.REACT_APP_BASE_URL;
  const counter = useRef(0);

  useEffect(() => {
    if (!twitchToken || counter > 49) return;
    setImgsLoading(true);
    async function fetchData() {
      const request = await axios.post(`${baseURL}/app/popular_titles`, {
        token: twitchToken,
      });
      setGameList(request.data);
      return request;
    }
    fetchData();
  }, [twitchToken]);

  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= gameList.length) {
      setImgsLoading(false);
    }
  };

  const loadedImages = gameList.map((game) => (
    <React.Fragment key={game.name}>
      {/* <span className='login__name'>{game?.name.split(':')[0]}</span> */}
      <img
        className='login__img'
        // style={{ display: imgsLoading && 'none' }}
        src={`//images.igdb.com/igdb/image/upload/t_cover_big_2x/${game?.cover.image_id}.jpg`}
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
      console.log(response);
      // props.onLogin(response.data.user);
    } catch (e) {
      setAuthError(e.response.data.message);
    } finally {
      // setLoading(false);
    }
  };

  if (loadedImages.length > 0) {
    if (!toLandingPage)
      return (
        <Login
          gameList={gameList}
          images={loadedImages}
          toLanding={() => setToLandingPage(true)}
          authenticateUser={(email, password) =>
            authenticateUser(email, password)
          }
          authError={authError}
        />
      );
  }
};

export default Authentication;
