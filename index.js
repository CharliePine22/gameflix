const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routesUrls = require('./routes/routes');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, () => {
  console.log('Database Connected!');
});

app.use(express.json());
app.use(bodyParser.json({ limit: '100kb' }));

const corsOptions = {
  origin: ['http://localhost:3000', 'https://gameflixx.netlify.app/'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use('/app', routesUrls);
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
