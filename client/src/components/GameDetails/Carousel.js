import React, { useEffect, useState } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
// import { useSwipeable } from 'react-swipeable';

import './Carousel.css';

export const CarouselItem = ({ children, width, imageUrl, game }) => {
  return (
    <div
      className='carousel-item'
      onClick={() => console.log(game)}
      style={{
        width: width,
        // backgroundImage: `url(${imageUrl})`,
        // objectFit: 'cover',
      }}
    >
      <img src={imageUrl} className='carousel-bg' />
      {children}
    </div>
  );
};

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = React.Children.count(children) - 1;
    } else if (newIndex >= React.Children.count(children)) {
      newIndex = 0;
    }

    setActiveIndex(newIndex);
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!paused) {
  //       updateIndex(activeIndex + 1);
  //     }
  //   }, 5000);

  //   return () => {
  //     if (interval) {
  //       clearInterval(interval);
  //     }
  //   };
  // });

  // const handlers = useSwipeable({
  //   onSwipedLeft: () => updateIndex(activeIndex + 1),
  //   onSwipedRight: () => updateIndex(activeIndex - 1),
  // });

  return (
    <div
      // {...handlers}
      className='carousel'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <MdArrowForwardIos
        className='carousel_forward_arrow'
        onClick={() => {
          updateIndex(activeIndex + 1);
        }}
      />
      <MdArrowForwardIos
        className='carousel_back_arrow'
        onClick={() => {
          updateIndex(activeIndex - 1);
        }}
      />
      <div
        className='inner'
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { width: '100%' });
        })}
      </div>
    </div>
  );
};

export default Carousel;
