import './Banner.css';
import { BiRefresh } from 'react-icons/bi';
import useFetchBanner from '../../hooks/useFetchBanner';

function Banner({ setGameDetails, addGame, activeProfile }) {
  const bannerGame = useFetchBanner();
  console.log(bannerGame)

  // Wait for game deatils to finish loading or the game name shows up undefined
  // Undefined is a game name apart of the dataset and will display jibberish
  if (bannerGame.isLoading || !bannerGame.currentGame) {
    return (
      <div className='banner__loading'>
        <div className='banner__spinner' />
      </div>
    );
  }
  const hasArt = bannerGame.currentGame?.artworks !== undefined;

  // Don't allow user to add game if already in collection
  const exists =
    activeProfile.collection &&
    activeProfile.collection.some(
      (title) => title?.id === bannerGame.currentGame?.id
    );

  // If the game description is longer that 150 characters, replace the reaminder with the ellipsis '...'
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <header className='banner' key={bannerGame.currentGame.id}>
      <div
        className='banner__img'
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_1080p_2x/${
            hasArt
              ? bannerGame.currentGame.artworks[0]?.image_id
              : bannerGame.currentGame.cover?.image_id
          }.jpg)`,
          backgroundPosition: 'center center',
        }}
      />
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
              Add to Collection
            </button>
          )}
        </div>

        <h1 className='banner__description'>
          {truncate(bannerGame.currentGame?.summary, 150)}
        </h1>
      </div>
      <div className='banner--fadeBottom' />

      <BiRefresh
        size={35}
        className='banner__refresh_icon'
        onClick={bannerGame.displayNewBanner}
      />
    </header>
  );
}

export default Banner;
