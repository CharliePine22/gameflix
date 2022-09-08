import React, { useState, useEffect } from 'react';

const UserLibrary = ({ activeProfile }) => {
  const [collection, setCollection] = useState(activeProfile.collection);

  return (
    <div className='row'>
      <h2 style={{ color: activeProfile.color }}>YOUR COLLECTION</h2>
      <div className='row__posters'></div>
    </div>
  );
};

export default UserLibrary;
