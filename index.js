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

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use('/app', routesUrls);
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.resolve(__dirname, './client/build')));
app.listen(process.env.PORT || 5000, () =>
  console.log('Server is up and running!')
);
