const express = require('express');

const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/routes');
const cors = require('cors');

dotenv.config();

mongoose.connect(process.env.MONGODB_ACCESS, () =>
  console.log('Database Connected!')
);

var corsOptions = {
  origin: 'https://gameflixx.netlify.app',
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use('/app', routesUrls);
app.use('/uploads', express.static('uploads'));
app.listen(process.env.PORT || 5000, () =>
  console.log('Server is up and running!')
);
