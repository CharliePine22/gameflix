// Rawg Credentials
const API_KEY = 'df0a614ea95743f7a9e2008a796b5249';

// Get todays date based off current timezone
let todayDate = new Date();
const offset = todayDate.getTimezoneOffset();
todayDate = new Date(todayDate.getTime() - offset * 60 * 1000);

// Date formatted in YYYY-MM-DD format
const currentDate = todayDate.toISOString().split('T')[0];

// * Create different date objects for filtering new games based off of current week, month, and year
// 1 year from current dates
const nextYear = currentDate.replace(
  todayDate.getFullYear(),
  todayDate.getFullYear() + 1
);

// Date months start at 0, so add 1 for current month and 2 for next month
const nextMonth = currentDate.replace(
  todayDate.getMonth() + 1,
  todayDate.getMonth() + 2
);

// Format into 2 digits for raw api endpoint
const formatMonth = (month) => {
  return month < 10 ? '0' + month : '' + month;
};

// const endYearDate = `${todayDate.getFullYear()}-12-31`;

// Determine how many days are in current month and if week overlaps with new month
// EX: Week differnce for:  2022-07-25 --> 2022-08-01
const determineDateCutoff = (month) => {
  const totalDays = new Date(todayDate.getFullYear(), month, 0).getDate();
  const nextWeek = todayDate.getDate() + 7;
  const difference = nextWeek - totalDays;

  // If the difference is positive, it means a new month has occured
  if (difference > 0) {
    const formattedMonth = formatMonth(todayDate.getMonth() + 2);
    return `${todayDate.getFullYear()}-${formattedMonth}-0${difference}`;
  }
  // If the end of the week is still in the same month, return the date
  else {
    const formattedMonth = formatMonth(todayDate.getMonth() + 1);
    return `${todayDate.getFullYear()}-${formattedMonth}-${nextWeek}`;
  }
};

// Grab past 3 months to filter the most popular games in the past 3 months
const previousQuarter = `${todayDate.getFullYear()}-${String(
  todayDate.getMonth() - 2
).padStart(2, '0')}-${todayDate.getDate()}`;

// Grab next 3 months to filter the most popular games in the past 3 months
const nextQuarter = `${todayDate.getFullYear()}-${String(
  todayDate.getMonth() + 2
).padStart(2, '0')}-${todayDate.getDate()}`;

const requests = [
  {
    requestId: 'fetchUpcomingTitles',
    yearUrl: `games?dates=${nextQuarter},${nextYear}&ordering=-added&key=${API_KEY}`,
    monthUrl: `games?dates=${currentDate},${nextMonth}&ordering=-added&key=${API_KEY}`,
    weekUrl: `games?dates=${currentDate},${determineDateCutoff(
      todayDate.getMonth() + 1
    )}&ordering=-added&key=${API_KEY}`,
    title: 'COMING SOON',
    todaysDate: currentDate,
  },
  {
    requestId: 'fetchPopularTitles',
    url: `games?dates=${previousQuarter},${currentDate}&ordering=rating_count&key=${API_KEY}`,
    title: 'POPULAR TITLES',
  },
  {
    requestId: 'fetchGOATTitles',
    url: `games?dates=2000-01-01,${currentDate}&ordering=-added&page_size=30&key=${API_KEY}`,
    title: 'G.O.A.Ts',
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
