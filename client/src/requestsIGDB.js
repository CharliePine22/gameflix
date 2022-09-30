// Get todays date based off current timezone
let todaysDate = new Date();
let igdbDate = Math.floor(todaysDate.getTime() / 1000);
let filterDate = igdbDate * 1000;

// List of endpoints for the Rawg.io API
const requests = [
  // {
  //   requestId: 'fetchUpcomingTitles',
  //   yearUrl: `games?dates=${nextQuarter},${nextYear}&ordering=-added&key=${API_KEY}`,
  //   monthUrl: `games?dates=${nextWeek},${nextMonthDate}&ordering=-added&key=${API_KEY}`,
  //   weekUrl: `games?dates=${currentDate},${determineDateCutoff(
  //     todayDate.getMonth() + 1
  //   )}&ordering=-added&key=${API_KEY}`,
  //   title: 'COMING SOON',
  //   todaysDate: currentDate,
  // },
  // {
  //   requestId: 'fetchPopularTitles',
  //   url: `games?dates=${lastMonthDate},${currentDate}&page_size=10&ordering=-added&key=${API_KEY}`,
  //   title: 'TRENDING',
  // },
  {
    requestId: 'fetchAdventureTitles',
    genreId: 31,
    title: 'ACTION/ADVENTURE GAMES',
  },
  {
    requestId: 'fetchArcadeTitles',
    genreId: 33,
    title: 'ARCADE GAMES',
  },
  {
    requestId: 'fetchMusicTitles',
    genreId: 7,
    title: 'MUSIC GAMES',
  },
  {
    requestId: 'fetchHackTitles',
    genreId: 25,
    title: 'HACK/SLASH TITLES',
  },
  {
    requestId: 'fetchFightingTitles',
    genreId: 4,
    title: 'FIGHTING GAMES',
  },
  {
    requestId: 'fetchIndieTitles',
    genreId: 32,
    title: 'INDIE GAMES',
  },
  {
    requestId: 'fetchMassivelyMultiplayerTitles',
    genreId: 36,
    title: 'MOBA GAMES',
  },
  {
    requestId: 'fetchPlatformerTitles',
    genreId: 8,
    title: 'PLATFORMER GAMES',
  },
  {
    requestId: 'fetchPuzzleTitles',
    genreId: 9,
    title: 'PUZZLE GAMES',
  },
  {
    requestId: 'fetchRacingTitles',
    genreId: 10,
    title: 'RACING GAMES',
  },
  {
    requestId: 'fetchRPGTitles',
    genreId: 12,
    title: 'RPG GAMES',
  },
  {
    requestId: 'fetchShooterTitles',
    genreId: 5,
    title: 'SHOOTER GAMES',
  },
  {
    requestId: 'fetchSimulationTitles',
    genreId: 13,
    title: 'SIMULATION GAMES',
  },
  {
    requestId: 'fetchSportsTitles',
    genreId: 14,
    title: 'SPORTS GAMES',
  },
  {
    requestId: 'fetchStrategy',
    genreId: (11, 15),
    title: 'STRATEGY GAMES',
  },
];

export default requests;
