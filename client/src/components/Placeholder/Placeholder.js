import React from 'react';
import './Placeholder.css';

const Placeholder = ({ delay }) => {
  return (
    <div
      className='placeholder'
      style={{ animationDelay: `${delay}ms` }}
      onClick={(e) => e.stopPropagation()}
    />
  );
};

export default Placeholder;
