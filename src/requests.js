// Rawg Credentials
const API_KEY = 'c69737aae4e04ce8ad8613ba04c2be9f';

// Get date object for finding release dates
const currentYear = new Date().getFullYear();
const dayAndMonth = (type) => {
  let value;
  if (type === 'month') {
    value = new Date().getMonth() + 1;
  } else if (type === 'day') {
    value = new Date().getDate();
  }
  if (value < 10) {
    return `0${value}`;
  } else {
    return value;
  }
};
const currentMonth = dayAndMonth('month');
const currentDay = dayAndMonth('day');
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;
const endYear = `${currentYear}-12-31`;
const startCurrentYear = `${currentYear}-01-01`;

let todayDate = new Date();
const offset = todayDate.getTimezoneOffset();
todayDate = new Date(todayDate.getTime() - offset * 60 * 1000);
const currentDate = todayDate.toISOString().split('T')[0];

console.log(currentDate.getFullYear);

const requests = [
  {
    requestId: 'fetchUpcomingTitles',
    url: `games?dates=${currentDate},${nextYear}&ordering=-added&key=${API_KEY}`,
    title: 'COMING SOON',
    todaysDate: currentDate,
  },
  {
    requestId: 'fetchPopularTitles',
    url: `games?dates=${startCurrentYear},${currentDate}&ordering=rating_count&key=${API_KEY}`,
    title: 'POPULAR TITLES',
  },
  {
    requestId: 'fetchActionTitles',
    url: `games?genres=4&key=${API_KEY}`,
    title: 'ACTION TITLES',
  },
  {
    requestId: 'fetchAdventureTitles',
    url: `games?genres=3&key=${API_KEY}`,
    title: 'ADVENTURE TITLES',
  },
  {
    requestId: 'fetchArcadeTitles',
    url: `games?genres=11&key=${API_KEY}`,
    title: 'ARCADE TITLES',
  },
  {
    requestId: 'fetchCardTitles',
    url: `games?genres=17&key=${API_KEY}`,
    title: 'CARD TITLES',
  },
  {
    requestId: 'fetchCasualTitles',
    url: `games?genres=40&key=${API_KEY}`,
    title: 'CASUAL TITLES',
  },
  {
    requestId: 'fetchEducationalTitles',
    url: `games?genres=34&key=${API_KEY}`,
    title: 'EDUCATIONAL TITLES',
  },
  {
    requestId: 'fetchFamilyTitles',
    url: `games?genres=19&key=${API_KEY}`,
    title: 'FAMILY TITLES',
  },
  {
    requestId: 'fetchFightingTitles',
    url: `games?genres=6&key=${API_KEY}`,
    title: 'FIGHTING TITLES',
  },
  {
    requestId: 'fetchIndieTitles',
    url: `games?genres=51&key=${API_KEY}`,
    title: 'INDIE TITLES',
  },
  {
    requestId: 'fetchMassivelyMultiplayerTitles',
    url: `games?genres=59&key=${API_KEY}`,
    title: 'MASSIVELY MULTIPLAYER TITLES',
  },
  {
    requestId: 'fetchPlatformerTitles',
    url: `games?genres=83&key=${API_KEY}`,
    title: 'PLATFORMER TITLES',
  },
  {
    requestId: 'fetchPuzzleTitles',
    url: `games?genres=7&key=${API_KEY}`,
    title: 'PUZZLE TITLES',
  },
  {
    requestId: 'fetchRacingTitles',
    url: `games?genres=1&key=${API_KEY}`,
    title: 'RACING TITLES',
  },
  {
    requestId: 'fetchRPGTitles',
    url: `games?genres=5&key=${API_KEY}`,
    title: 'RPG TITLES',
  },
  {
    requestId: 'fetchShooterTitles',
    url: `games?genres=2&key=${API_KEY}`,
    title: 'SHOOTER TITLES',
  },
  {
    requestId: 'fetchSimulationTitles',
    url: `games?genres=14&key=${API_KEY}`,
    title: 'SIMULATION TITLES',
  },
  {
    requestId: 'fetchSportsTitles',
    url: `games?genres=15&key=${API_KEY}`,
    title: 'SPORTS TITLES',
  },
  {
    requestId: 'fetchStrategy',
    url: `games?genres=10&key=${API_KEY}`,
    title: 'STRATEGY TITLES',
  },
];

export default requests;
