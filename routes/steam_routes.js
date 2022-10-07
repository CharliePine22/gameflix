const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const passportSteam = require('passport-steam');
var SteamStrategy = passportSteam.Strategy;
const app = express();
dotenv.config();

// Required to get data from user for sessions
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

let baseURL;

if (process.env.PORT) {
  baseURL = 'https://gameflexx.herokuapp.com';
} else {
  baseURL = 'http://localhost:3000';
}

// Initiate Strategy
passport.use(
  new SteamStrategy(
    {
      returnURL: baseURL + '/return',
      realm: baseURL + '/',
      apiKey: process.env.STEAM_API_KEY,
    },
    function (identifier, profile, done) {
      process.nextTick(function () {
        profile.identifier = identifier;
        return done(null, profile);
      });
    }
  )
);

app.use(
  session({
    secret: 'Yunaismybestfriendforever511022',
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 3600000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send(req.user);
});

// Redirect to steam for authentication
router.get(
  '/steam_auth',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/');
  }
);

// Return route for coming back from auth or failure
router.get(
  '/return',
  // Issue #37 - Workaround for Express router module stripping the full url, causing assertion to fail
  function (req, res, next) {
    req.url = req.originalUrl;
    next();
  },
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/');
  }
);

module.exports = router;
