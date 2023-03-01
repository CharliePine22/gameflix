import { useState, useEffect, memo } from 'react';

// Component Imports
import Row from '../Row/Row';
import Banner from '../Banner/Banner';
import Nav from '../Nav/Nav';
import MainRow from '../MainRow/MainRow';
import TrendingRow from '../TrendingRow/TrendingRow';

// File Imports
import axios from 'axios';
import SpotifyPlayback from '../SpotifyPlayback/SpotifyPlayback';
import useSpotifyAuth from '../../hooks/useSpotifyAuth';
import useSteamAuth from '../../hooks/useSteamAuth';
import UserLibrary from '../UserLibrary/UserLibrary';
import GameDetails from '../GameDetails/GameDetails';
import UserCollection from '../UserCollectionPage/UserCollection';
import Notification from '../Notification/Notification';

const code = new URLSearchParams(window.location.search).get('code');
const windowUrl = window.location.search;
const id = windowUrl.split('?')[1];

const Dashboard = ({
  currentUser,
  twitchToken,
  currentProfile,
  currentCollection,
  allGenres,
  userNotes,
  manageProfiles,
  updateCollection,
  selectProfile,
  fetchGame,
  addGame,
  removeGame,
  logoutUser,
}) => {
  const [displayNotification, setDisplayNotification] = useState(false);
  const [notification, setNotification] = useState({ status: '', message: '' });

  // Spotify States
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playAudio, setPlayAudio] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [trendingList, setTrendingList] = useState([]);

  // User states
  const [changingUser, setChangingUser] = useState(false);
  const [editingUser, setEditingUser] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [userCollection, setUserCollection] = useState([]);
  const [viewingCollection, setViewingCollection] = useState(false);

  // Row States
  const [currentGameOpen, setCurrentGameOpen] = useState(null);

  // Search States
  const [searchedGame, setSearchedGame] = useState({ name: '', data: [] });
  const [gameDetails, setGameDetails] = useState(null);

  // Local Variables
  const baseURL = process.env.REACT_APP_BASE_URL;

  const spotifyAccessToken = useSpotifyAuth(code);
  const steamCollection = useSteamAuth(id);

  useEffect(() => {
    if (!currentGameOpen) document.body.style.overflow = 'auto';
  }, []);

  useEffect(() => {
    if (trendingList.length > 0 || !twitchToken) return;

    const fetchSteamTrending = async () => {
      const request = await axios.get(`${baseURL}/steam/steam_trending`);
      return request.data;
    };

    const fetchTrendingGames = async () => {
      const trendingGameNames = await fetchSteamTrending();
      const mapObj = {
        Poke: 'Poké',
        '*': '',
        '(2022)': '',
        '(2023)': '',
        '/Violet*': '',
      };
      const trendingGamesList = await Promise.all(
        trendingGameNames.map((game) => {
          game = game.replace(
            /Poke|'*'|(2022)|(2023)|\/Violet*/g,
            function (matched) {
              return mapObj[matched];
            }
          );
          // Get rid of symbols regex cant handle w/o slowing down (FIND FIX)
          game = game.replace('undefined', '');
          game = game.replace('*', '');
          game = game.replace('()', '');
          return axios.post(`${baseURL}/app/search_trending_game`, {
            token: twitchToken,
            gameName: game,
          });
        })
      );

      setTrendingList(trendingGamesList.map((game) => game.data[0]));
      return trendingGamesList;
    };

    fetchTrendingGames();
  }, [trendingList, twitchToken]);

  //   setViewingSoundtrack(false);
  //   if (!spotifyToken) {
  //     console.log('Please connect to Spotify!');
  //     return;
  //   }
  //   try {
  //     const request = await axios.get(`${baseURL}/app/spotify_album`, {
  //       params: {
  //         game,
  //         token: spotifyToken,
  //         baseURL,
  //       },
  //     });
  //     if (request.data.status !== 'OK') {
  //       window.location = '/';
  //       localStorage.removeItem('spotify_token');
  //     } else {
  //       setCurrentPlaylist(request.data.tracks);
  //       setViewingSoundtrack(true);
  //     }
  //   } catch (error) {
  //     console.log('OST FETCH ISSUE');
  //   }
  // };

  const changeProfile = (user) => {
    setChangingUser(true);
    localStorage.setItem('profile', user.name);
    setTimeout(() => {
      setChangingUser(false);
    }, 2000);
  };

  const openGameWindow = (game) => {
    console.log(game);
    setCurrentGameOpen(game.id);
    document.body.style.overflow = 'hidden';
  };

  const closeGameWindow = () => {
    document.body.style.overflow = 'auto';
    setCurrentGameOpen(null);
  };

  const playTrack = (track) => {
    setCurrentTrack(track);
  };

  // Loading screen for profile change
  if (changingUser) {
    return (
      <div className='loading_profile__container'>
        <div className='loading_profile'>
          <img src={currentProfile.avatar} alt='current user avatar' />
        </div>
      </div>
    );
  }

  if (currentProfile) {
    if (gameDetails !== null) {
      return (
        <>
          <GameDetails
            setNotification={(status, message) =>
              setNotification({ status, message })
            }
            game={gameDetails}
            closeDetails={() => setGameDetails(null)}
            twitchToken={twitchToken}
            addGame={(game) => addGame(game)}
            removeGame={(game) => removeGame(game)}
            activeProfile={currentProfile}
          />
          <Notification
            notification={notification}
            displayNotification={displayNotification}
            hideNotification={() => {
              setNotification({ message: '', status: '' });
            }}
          />
        </>
      );
    }

    if (viewingCollection)
      return (
        <UserCollection
          collection={currentCollection}
          activeProfile={currentProfile}
          backToHome={() => setViewingCollection(false)}
          currentTrack={currentTrack}
          playTrack={playTrack}
          isPlaying={playAudio}
          pausePlayback={() => setPlayAudio(false)}
          resumePlayback={() => setPlayAudio(true)}
          setSelectedProfile={(profile) => setSelectedProfile(profile)}
          spotifyToken={spotifyAccessToken}
          removeGame={(game) => removeGame(game)}
          updateCollection={updateCollection}
          userNotes={userNotes}
        />
      );

    return (
      <div className='App'>
        <Nav
          currentUser={currentUser}
          activeProfile={currentProfile}
          changeUser={changeProfile}
          onLogout={logoutUser}
          fetchSubmittedGame={fetchGame}
          toProfilePage={() => localStorage.removeItem('profile')}
          selectProfile={(profile) => setSelectedProfile(profile)}
          spotifyToken={spotifyAccessToken}
          twitchToken={twitchToken}
          searchedGame={searchedGame}
          saveEdit={() => setEditingUser(true)}
          setLoggedUser={(user) => setLoggedUser(user)}
          updateCollection={updateCollection}
          currentCollection={currentCollection}
          viewCollection={() => setViewingCollection(true)}
        />

        <Banner
          setGameDetails={(id) => setGameDetails(id)}
          twitchToken={twitchToken}
          addGame={(game) => addGame(game)}
          activeProfile={currentProfile}
        />
        <MainRow
          twitchToken={twitchToken}
          setGameDetails={(game) => setGameDetails(game)}
        />

        <TrendingRow
          twitchToken={twitchToken}
          setGameDetails={(game) => setGameDetails(game)}
          trendingList={trendingList}
        />
        <UserLibrary
          activeProfile={currentProfile}
          playTrack={playTrack}
          currentTrack={currentTrack}
          isPlaying={playAudio}
          pausePlayback={() => setPlayAudio(false)}
          resumePlayback={() => setPlayAudio(true)}
          spotifyToken={spotifyAccessToken}
          collection={currentCollection}
          setSelectedProfile={(profile) => setSelectedProfile(profile)}
          setGameDetails={(game) => setGameDetails(game)}
          steamCollection={steamCollection}
          removeGame={removeGame}
          viewCollection={() => setViewingCollection(true)}
          setNotification={(status, message) => {
            setNotification({ status, message });
            setDisplayNotification(true);
          }}
          setCompleteCollection={(collection) => setUserCollection(collection)}
        />
        {currentGameOpen && (
          <h1 className='row__preview_close' onClick={closeGameWindow}>
            X
          </h1>
        )}
        <div
          className={`${currentGameOpen !== null && 'game_preview__modal'}`}
        />

        {allGenres.map((request) => (
          <Row
            key={Object.keys(request)}
            activeProfile={currentProfile}
            spotifyToken={spotifyAccessToken}
            genreDetails={Object.entries(request)}
            playTrack={playTrack}
            currentTrack={currentTrack}
            setGameDetails={(game) => setGameDetails(game)}
            resumePlayback={(e) => setPlayAudio(true)}
            pausePlayback={(e) => setPlayAudio(false)}
            isPlaying={playAudio}
            currentGameOpen={currentGameOpen}
            openGame={(game) => openGameWindow(game)}
            closeGameWindow={closeGameWindow}
            addGame={(game) => addGame(game)}
            setNotification={(status, message) =>
              setNotification({ status, message })
            }
          />
        ))}

        {spotifyAccessToken && (
          <SpotifyPlayback
            spotifyToken={spotifyAccessToken}
            playAudio={playAudio}
            beginPlayback={(e) => setPlayAudio(true)}
            pausePlayback={(e) => setPlayAudio(false)}
            trackUri={currentTrack?.uri}
          />
        )}

        <Notification
          notification={notification}
          displayNotification={displayNotification}
          hideNotification={() => {
            setNotification({ message: '', status: '' });
          }}
        />
      </div>
    );
  }
};

export default memo(Dashboard);
