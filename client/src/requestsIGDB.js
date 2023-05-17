// Get todays date based off current timezone
let todaysDate = new Date();
let igdbDate = Math.floor(todaysDate.getTime() / 1000);
let filterDate = igdbDate * 1000;

// List of endpoints for the Rawg.io API
const requests = [
  {
    requestId: 'fetchAdventureTitles',
    genreId: 31,
    title: 'ACTION/ADVENTURE',
  },
  {
    requestId: 'fetchArcadeTitles',
    genreId: 33,
    title: 'ARCADE',
  },
  {
    requestId: 'fetchMusicTitles',
    genreId: 7,
    title: 'MUSIC',
  },
  {
    requestId: 'fetchHackTitles',
    genreId: 25,
    title: 'HACK/SLASH',
  },
  {
    requestId: 'fetchFightingTitles',
    genreId: 4,
    title: 'FIGHTING',
  },
  {
    requestId: 'fetchIndieTitles',
    genreId: 32,
    title: 'INDIE',
  },
  {
    requestId: 'fetchMassivelyMultiplayerTitles',
    genreId: 36,
    title: 'MOBA',
  },
  {
    requestId: 'fetchPlatformerTitles',
    genreId: 8,
    title: 'PLATFORMER',
  },
  {
    requestId: 'fetchPuzzleTitles',
    genreId: 9,
    title: 'PUZZLE',
  },
  {
    requestId: 'fetchRacingTitles',
    genreId: 10,
    title: 'RACING',
  },
  {
    requestId: 'fetchRPGTitles',
    genreId: 12,
    title: 'RPG',
  },
  {
    requestId: 'fetchShooterTitles',
    genreId: 5,
    title: 'SHOOTER',
  },
  {
    requestId: 'fetchSimulationTitles',
    genreId: 13,
    title: 'SIMULATION',
  },
  {
    requestId: 'fetchSportsTitles',
    genreId: 14,
    title: 'SPORTS',
  },
  {
    requestId: 'fetchStrategy',
    genreId: (11, 15),
    title: 'STRATEGY',
  },
];

export default requests;
