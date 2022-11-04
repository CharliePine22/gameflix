import { useState, useEffect } from 'react';
import './App.css';

// Component Imports
import ProfilesPage from './components/Login/Profiles/ProfilesPage';
// File Imports
import requestsIGDB from './requestsIGDB';
import loginAudio from './assets/sounds/success.wav';
import axios from 'axios';
import SpotifyPlayback from './components/SpotifyPlayback/SpotifyPlayback';
import useSpotifyAuth from './hooks/useSpotifyAuth';
import useTwitchAuth from './hooks/useTwitchAuth';
import Authentication from './components/Authentication/Authentication';
import Dashboard from './components/Dashboard/Dashboard';

const code = new URLSearchParams(window.location.search).get('code');

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [displayNotification, setDisplayNotification] = useState(false);
  const [notification, setNotification] = useState({ status: '', message: '' });
  // User states
  const [changingUser, setChangingUser] = useState(false);
  const [updatingUser, setUpdatingUser] = useState(false);
  const [editingUser, setEditingUser] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileCollection, setProfileCollection] = useState([]);
  const [genreList, setGenreList] = useState([]);

  // Local Variables
  const baseURL = process.env.REACT_APP_BASE_URL;
  const userEmail = localStorage.getItem('user');
  const userProfile = localStorage.getItem('profile');

  let audio = new Audio(loginAudio);

  const twitchAccessToken = useTwitchAuth(code);

  // Refetch user data if any changes are made
  useEffect(() => {
    if (!userEmail) return;
    const updateUser = async () => {
      try {
        const request = await axios.get(`${baseURL}/app/get_user`, {
          params: {
            email: userEmail,
          },
        });
        console.log(request);
        const result = await request.data;
        setLoggedUser(result);
        return result;
      } catch (error) {
        console.log(error);
        return error;
      }
    };
    const getGenreGames = async () => {
      try {
        const request = await axios.get(`${baseURL}/game_genres`);
      } catch (error) {
        console.log(error);
      }
    };
    updateUser();
  }, [userEmail]);

  // Check to see which profile is active
  useEffect(() => {
    if (!userProfile || !loggedUser) return;
    const getProfileData = (profile) => {
      const currentProfile = loggedUser.profiles.filter((obj) => {
        return obj.name === profile;
      });

      setSelectedProfile(currentProfile[0]);
      if (currentProfile[0].collection) {
        setProfileCollection(
          currentProfile[0].collection.filter((game) => game.id !== null)
        );
      }
    };
    getProfileData(userProfile);
  }, [selectedProfile, userProfile, loggedUser]);

  useEffect(() => {
    if (!twitchAccessToken) return;
    const fetchGenreGames = async () => {
      const genreTitles = await Promise.all(
        requestsIGDB.map((genre) => {
          return axios.post(`${baseURL}/app/game_genre`, {
            token: twitchAccessToken,
            genreId: genre.genreId,
            genreTitle: genre.title,
          });
        })
      );

      const completeGenreList = genreTitles.map((genre) => genre.data);

      setGenreList(completeGenreList);
      return;
    };
    fetchGenreGames();
  }, [twitchAccessToken]);

  // Login user if verification succeeds.
  const loginAuthentication = (user) => {
    localStorage.setItem('user', user.email);
    setLoggedUser(user);
    audio.play();
  };

  const changeProfile = (user) => {
    setChangingUser(true);
    // setSelectedProfile(user.name);
    localStorage.setItem('profile', user.name);
    setTimeout(() => {
      setChangingUser(false);
    }, 2000);
  };

  // Display login page if app detects sign out or sign in
  if (!userEmail) {
    return (
      <Authentication
        loading={isLoading}
        onLogin={loginAuthentication}
        twitchToken={twitchAccessToken}
      />
    );
  }

  if (!userProfile && loggedUser) {
    return (
      <ProfilesPage
        updatingUser={() => setUpdatingUser(true)}
        saveEdit={() => setEditingUser(true)}
        updateUser={updatingUser}
        currentUser={loggedUser}
        selectProfile={(user) => setSelectedProfile(user)}
        twitchToken={twitchAccessToken}
      />
    );
  }
  if (loggedUser) {
    return (
      <Dashboard
        currentUser={loggedUser}
        twitchToken={twitchAccessToken}
        currentProfile={selectedProfile}
        currentCollection={profileCollection}
        updateCollection={(collection) =>
          setProfileCollection(collection.filter((game) => game.id !== null))
        }
        selectProfile={(user) => setSelectedProfile(user)}
        manageProfiles={() => setSelectedProfile(null)}
        allGenres={genreList}
      />
    );
  } else {
    return (
      <div className='auth_login__loading'>
        <div className='auth_loading_spinner' />
      </div>
    );
  }
}

export default App;
