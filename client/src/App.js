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
    const updateUser = async () => {
      if (!userEmail) return;
      const request = await axios.get(`${baseURL}/app/get_user`, {
        params: {
          email: userEmail,
        },
      });
      const result = await request.data;
      setLoggedUser(result);
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
      setProfileCollection(
        currentProfile[0].collection.filter((game) => game.id !== null)
      );
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

  // Add game name and id to DB
  const addGameHandler = async (game) => {
    const exists = selectedProfile.collection.some(
      (item) => item.id === game.id
    );
    if (exists) {
      setNotification({
        message: `${game.name} is already in your collection!`,
        status: 'ERROR',
      });
      setDisplayNotification(true);
      return;
    }
    try {
      const request = await axios.post(`${baseURL}/app/update_collection`, {
        email: userEmail,
        currentProfile: currentProfile,
        name: game.name,
        id: game.id,
        imageURL: `//images.igdb.com/igdb/image/upload/t_cover_big_2x/${game.cover.image_id}.jpg`,
        playtime: 0,
        origin: 'gameflix',
      });
      localStorage.setItem('user', JSON.stringify(request.data.response));
      const currentProfile = request.data.response.profiles.filter((obj) => {
        return obj.name === currentProfile;
      });
      localStorage.setItem('profile', JSON.stringify(currentProfile[0]));
      setSelectedProfile(currentProfile[0]);
      setNotification({
        message: `${game.name} sucessfully added to your collection!`,
        status: 'SUCCESS',
      });
      setDisplayNotification(true);
      return;
    } catch (error) {
      setNotification({
        message: `Unable to add ${game.name} to your collection!`,
        status: 'ERROR',
      });
      setDisplayNotification(true);
      return error;
    }
  };

  const removeGameHandler = async (game) => {
    console.log(game);
    try {
      const request = await axios.put(`${baseURL}/app/remove_game`, {
        email: userEmail,
        currentProfile: userProfile,
        game: game.id,
      });
      localStorage.setItem('user', JSON.stringify(request.data.response));
      const currentProfile = request.data.response.profiles.filter((obj) => {
        return obj.name === userProfile;
      });
      localStorage.setItem('profile', JSON.stringify(currentProfile[0]));
      setSelectedProfile(currentProfile[0]);
      setNotification({
        message: `${game.name} sucessfully removed from your collection!`,
        status: 'SUCCESS',
      });
      setDisplayNotification(true);
      return;
    } catch (error) {
      console.log(error);
      setNotification({
        message: `Unable to remove ${game.name} from your collection!`,
        status: 'ERROR',
      });
      setDisplayNotification(true);
      return;
    }
  };

  // Login user if verification succeeds.
  const loginAuthentication = (user) => {
    localStorage.setItem('user', user.email);
    setLoggedUser(user);
    audio.play();
  };

  // Logout the user
  const logoutHandler = () => {
    setLoggedUser(null);
    setSelectedProfile(null);
    localStorage.clear('user');
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
  if (genreList.length > 0) {
    return (
      <Dashboard
        currentUser={loggedUser}
        twitchToken={twitchAccessToken}
        currentProfile={selectedProfile}
        currentCollection={profileCollection}
        updateCollection={(collection) =>
          setProfileCollection(
            collection.filter((game) => game.id !== null)
          ).sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
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
