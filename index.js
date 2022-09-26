const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/routes');
const cors = require('cors');

dotenv.config();

mongoose.connect(process.env.MONGODB_ACCESS, () => {
  console.log('Database Connected!');
});

app.use(express.json());
app.use(cors());
app.use('/app', routesUrls);
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(function (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*');
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.listen(process.env.PORT || 5000, () =>
  console.log('Server is up and running!')
);
