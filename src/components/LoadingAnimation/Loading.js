import React, { useState, useEffect } from 'react';
import './Loading.css';

const Loading = () => {
  const [button, setButton] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      switch (button) {
        case 'square':
          setButton('triangle');
          break;
        case 'triangle':
          setButton('circle');
          break;
        case 'circle':
          setButton('x');
          break;
        case 'x':
          setButton('square');
          break;
        default:
          setButton('square');
          break;
      }
    }, 150);

    return () => {
      clearInterval(interval);
    };
  }, [button]);

  return (
    <div className='loading'>
      <div
        className='loading__button'
        style={{
          backgroundColor: button == 'square' ? '#de88d2' : 'transparent',
        }}
      />{' '}
      {/* SQUARE */}
      <div
        className='loading__button'
        style={{
          backgroundColor: button == 'triangle' ? '#5ebba9' : 'transparent',
        }}
      />{' '}
      {/* TRIANGLE */}
      <div
        className='loading__button'
        style={{
          backgroundColor: button == 'x' ? '#90bdf5' : 'transparent',
        }}
      />{' '}
      {/* X */}
      <div
        className='loading__button'
        style={{
          backgroundColor: button == 'circle' ? '#ff5b55' : 'transparent',
        }}
      />{' '}
      {/* CIRCLE */}
    </div>
  );
};

export default Loading;
