const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/routes');
const authenticationRoutes = require('./routes/authentication_routes');
const spotifyRoutes = require('./routes/spotify_routes');
const igdbRoutes = require('./routes/igdb_routes');
const cors = require('cors');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, () => {
  console.log('Database Connected!');
});

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const corsOptions = {
  origin: ['http://localhost:3000', 'https://gameflixx.netlify.app/'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use('/app', routesUrls);
app.use('/authentication', authenticationRoutes);
app.use('/spotify', spotifyRoutes);
app.use('/igdb', igdbRoutes);
app.use('/uploads', express.static('uploads'));

if (process.env.PORT) {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(process.env.PORT || 3001, () =>
  console.log('Server is up and running!')
);
