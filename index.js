const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const passportSteam = require('passport-steam');
const SteamStrategy = passportSteam.Strategy;

// Route imports
const routesUrls = require('./routes/routes');
const authenticationRoutes = require('./routes/authentication_routes');
const spotifyRoutes = require('./routes/spotify_routes');
const igdbRoutes = require('./routes/igdb_routes');
const playstationRoutes = require('./routes/psn_routes');
const steamRoutes = require('./routes/steam_routes');
const genreRoutes = require('./routes/genre_routes');
const noteRoutes = require('./routes/notes_routes');
const cors = require('cors');
dotenv.config();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI, () => {
  console.log('Database Connected!');
});

// Required to get data from user for sessions
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Coors
const corsOptions = {
  origin: ['http://localhost:3000', 'https://cybrary2022.onrender.com'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Initiate Strategy
passport.use(
  new SteamStrategy(
    {
      returnURL: 'http://localhost:3001/api/auth/steam/return',
      // returnURL: baseURL + port + '/api/auth/steam/return',
      realm: 'http://localhost:3001/',
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

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/app', routesUrls);
app.use('/authentication', authenticationRoutes);
app.use('/spotify', spotifyRoutes);
app.use('/igdb', igdbRoutes);
app.use('/playstation', playstationRoutes);
app.use('/steam', steamRoutes);
app.use('/genres', genreRoutes);
app.use('/notes', noteRoutes);
app.use('/uploads', express.static('uploads'));

if (process.env.PORT) {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use(function (req, res, next) {
  if (req.secure) {
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }
  next();
});

app.listen(process.env.PORT || 3001, () =>
  console.log(
    `Server is up and running on ${
      process.env.PORT ? process.env.PORT : '3001'
    }`
  )
);

app.get('/', (req, res) => {
  res.redirect(`http://localhost:3000?${req.user.id}`);
  // res.send(req.user.id);
});

app.get('/api/auth/steam', passport.authenticate('steam'), function (req, res) {
  res.redirect('/');
});

app.get(
  '/api/auth/steam/return',
  passport.authenticate('steam', { failureRedirect: '/' }),
  function (req, res) {
    // res.send(req.user);
    res.redirect('/');
  }
);
