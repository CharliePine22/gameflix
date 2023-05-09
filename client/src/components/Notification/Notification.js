import React, { useEffect, useState } from 'react';
import './Notification.css';
import notifyAudio from '../../assets/sounds/notify.mp3';

const Notification = ({
  notification,
  displayNotification,
  hideNotification,
}) => {
  const [fadeProp, setFadeProp] = useState({
    fade: 'notification__fade-out',
  });

  let audio = new Audio(notifyAudio);

  useEffect(() => {
    const timeout = setInterval(() => {
      setFadeProp({
        fade: 'notification__fade-out',
      });
    }, 3000);

    return () => {
      if (notification.message !== '') audio.play();
      clearInterval(timeout);
      setFadeProp({
        fade: 'notification__fade-in',
      });
    };
  }, [notification]);

  const userProfile = localStorage.getItem('profile');
  {
    return (
      userProfile && (
        <div
          className={`notification__wrapper ${fadeProp.fade}`}
          style={{ color: userProfile.color }}
        >
          <div className='notification__container'>
            <h3 className='notification__title'>{notification.status}</h3>
            <p className='notification__message'>{notification.message}</p>
          </div>
        </div>
      )
    );
  }
};

export default Notification;
