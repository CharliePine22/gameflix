import React from 'react';
import Skeleton from 'react-loading-skeleton';
import './SkeletonCard.css';

const SkeletonCard = ({ count, type }) => {
  if (type == 'full') {
    return (
      <section className='skeleton_card_wrapper'>
        <ul className='list'>
          {Array(count)
            .fill()
            .map((item, index) => (
              <li className='card' key={index}>
                <Skeleton
                  height={180}
                  className='card_banner'
                  highlightColor='#323232'
                />
                <h4 className='card-title'>
                  <Skeleton
                    className='card_cover'
                    baseCover='rgb(35, 35, 35)'
                    highlightColor='#222222'
                    circle={false}
                  />{' '}
                  &nbsp;
                  <Skeleton
                    className='skeleton_title'
                    highlightColor='#222222'
                    baseCover='rgb(35, 35, 35)'
                  />
                </h4>
                <p>
                  <Skeleton
                    style={{ marginLeft: '10px' }}
                    className='card-channel'
                    width={`60%`}
                    highlightColor='#222222'
                  />
                </p>
                <div>
                  <Skeleton
                    style={{ marginLeft: '10px' }}
                    className='card-metrics'
                    width={`90%`}
                    highlightColor='#222222'
                  />
                </div>
              </li>
            ))}
        </ul>
      </section>
    );
  } else {
    return (
      <section className='skeleton_card_wrapper'>
        <ul className='list_small'>
          {Array(count)
            .fill()
            .map((item, index) => (
              <li className='card_small' key={index}>
                <Skeleton
                  height={104}
                  className='card_banner_small'
                  highlightColor='#222222'
                  enableAnimation={false}
                />
                <h4 className='card-title_small'>
                  <Skeleton
                    className='card_cover_small'
                    circle={false}
                    highlightColor='#222222'
                  />{' '}
                  &nbsp;
                  <Skeleton
                    className='skeleton_title_small'
                    highlightColor='#222222'
                  />
                </h4>
              </li>
            ))}
        </ul>
      </section>
    );
  }
};

export default SkeletonCard;
