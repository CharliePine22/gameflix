const express = require('express');
const router = express.Router();
const userModel = require('../models/NewUserModels');
const multer = require('multer');

// Determine whether or not email exists in database
const newAccountValidation = async (email) => {
  const result = await userModel.findOne({ email: email });
  return result == null;
};

// Find user helper function
const findUser = async (email) => {
  const result = await userModel.findOne({ email: email });
  return result;
};

// Transform upload file into DB Object String
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    if (
      [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/gif',
        'image/sveg',
        'image/ico',
      ].includes(file.mimetype)
    ) {
      cb(null, Date.now() + '-' + file.originalname);
    } else {
      cb('Invalid file type', 'No');
    }
  },
});

const upload = multer({ storage: storage });

//! EMAIL VERIFICATION
router.post('/email_verification', (req, res) => {
  newAccountValidation(req.body.email).then(function (valid) {
    if (valid) {
      res.status(200).send({ status: 'success' });
    } else {
      res.status(400).send({ message: 'Email is already in use!' });
    }
  });
});

//! SIGN IN
router.post('/signin', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  findUser(email).then(function (user) {
    if (user == null || password !== user.password)
      res
        .status(400)
        .send({ message: 'Incorrect email or password!', undefined });
    if (user && password == user.password) {
      res.status(200).send({ message: 'User logged in successfully!', user });
      return;
    }
  });
});

//! SIGN UP
router.post('/signup', upload.single('avatar'), (req, res) => {
  let avatar;
  let color;
  if (!req.file) {
    avatar = '';
  } else {
    avatar = req.file.destination + '/' + req.file.filename;
  }

  if (!req.body.color) {
    color = '#9147ff';
  } else {
    color = req.body.color;
  }

  const newUser = new userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    color: color,
    avatar: avatar,
  });

  newAccountValidation(req.body.email).then(function (valid) {
    if (valid) {
      newUser.profiles.push({
        name: req.body.firstName,
        avatar: avatar,
        color: req.body.color,
        isAdmin: true,
      });
      newUser
        .save()
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          res.json(error);
        });
    } else {
      res.status(400).send({ message: 'Email is already in use!' });
    }
  });
});

module.exports = router;
