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
                <Skeleton height={180} />
                <h4 className='card-title'>
                  <Skeleton className='card_cover' circle={false} /> &nbsp;
                  <Skeleton className='skeleton_title' />
                </h4>
                <p>
                  <Skeleton
                    style={{ marginLeft: '10px' }}
                    className='card-channel'
                    width={`60%`}
                  />
                </p>
                <div>
                  <Skeleton
                    style={{ marginLeft: '10px' }}
                    className='card-metrics'
                    width={`90%`}
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
                <Skeleton height={104} />
                <h4 className='card-title_small'>
                  <Skeleton className='card_cover_small' circle={false} />{' '}
                  &nbsp;
                  <Skeleton className='skeleton_title_small' />
                </h4>
              </li>
            ))}
        </ul>
      </section>
    );
  }
};

export default SkeletonCard;
