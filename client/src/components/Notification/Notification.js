import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({
  notification,
  displayNotification,
  hideNotification,
}) => {
  const [fadeProp, setFadeProp] = useState({
    fade: 'notification__fade-out',
  });

  useEffect(() => {
    const timeout = setInterval(() => {
      setFadeProp({
        fade: 'notification__fade-out',
      });
    }, 3000);

    return () => {
      clearInterval(timeout);
      setFadeProp({
        fade: 'notification__fade-in',
      });
    };
  }, [displayNotification, notification]);

  const userProfile = JSON.parse(localStorage.getItem('profile'));
  return (
    <div
      className={`notification__wrapper ${fadeProp.fade}`}
      style={{ color: userProfile.color }}
    >
      <div className='notification__container'>
        <h3 className='notification__title'>{notification.status}</h3>
        <p className='notification__message'>{notification.message}</p>
      </div>
    </div>
  );
};

export default Notification;
