import './Banner.css';
import { useEffect, useState, useRef } from 'react';
import { BiRefresh, BiVolumeMute, BiVolumeFull } from 'react-icons/bi';
import useFetchBanner from '../../hooks/useFetchBanner';
import ReactPlayer from 'react-player/youtube';
import useDetectOnScreen from '../../hooks/useDetectOnScreen';

function Banner({ setGameDetails, addGame, activeProfile }) {
  const bannerGame = useFetchBanner();
  const exists =
    activeProfile.collection &&
    activeProfile.collection.some(
      (title) => title.id === bannerGame.currentGame.id
    );
  const [mutedVideo, setMutedVideo] = useState(true);
  const bannerRef = useRef(null);
  const refVisible = useDetectOnScreen(bannerRef);
  const [playingVideo, setPlayingVideo] = useState(true);
  const [trailerEnded, setTrailerEnded] = useState(false);

  useEffect(() => {
    if (!bannerGame.currentGame) return;
    setPlayingVideo(refVisible);
  }, [refVisible, bannerGame.currentGame]);

  // If the game description is longer that 150 characters, replace the reaminder with the ellipsis '...'
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  // Wait for game deatils to finish loading or the game name shows up undefined
  // Undefined is a game name apart of the dataset and will display jibberish
  if (bannerGame.isLoading) {
    return (
      <div className='banner__loading'>
        <div className='banner__spinner' />
      </div>
    );
  }

  return (
    <header className='banner' key={bannerGame.currentGame.id}>
      <div ref={bannerRef}>
        <ReactPlayer
          className='banner__trailer'
          url={bannerGame.currentGameTrailer}
          playing={playingVideo ? true : false}
          muted={mutedVideo ? true : false}
          onEnded={() => setTrailerEnded(true)}
          light={
            trailerEnded
              ? `//images.igdb.com/igdb/image/upload/t_1080p_2x/${bannerGame.currentGame.cover?.image_id}.jpg`
              : false
          }
        />
        <>
          <div className='banner__contents'>
            <h1 className='banner__title'>{bannerGame.currentGame?.name}</h1>

            <div className='banner__buttons'>
              <button
                className='banner__button'
                onClick={() => setGameDetails(bannerGame.currentGame)}
              >
                See Details
              </button>
              {!exists && (
                <button
                  className='banner__button'
                  onClick={() => addGame(bannerGame.currentGame)}
                >
                  Add to My List
                </button>
              )}
            </div>

            <h1 className='banner__description'>
              {truncate(bannerGame.currentGame?.summary, 150)}
            </h1>
          </div>
          <div className='banner--fadeBottom' />
        </>

        {
          <BiRefresh
            size={35}
            className='banner__refresh_icon'
            onClick={bannerGame.displayNewBanner}
          />
        }
        {mutedVideo ? (
          <BiVolumeMute
            size={27}
            className='banner__mute_btn'
            onClick={() => setMutedVideo(false)}
          />
        ) : (
          <BiVolumeFull
            size={27}
            className='banner__volume_btn'
            onClick={() => setMutedVideo(true)}
          />
        )}
      </div>
    </header>
  );
}

export default Banner;
