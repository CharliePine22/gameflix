const express = require('express');
const router = express.Router();
const userModel = require('../models/newUserModels');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Transform upload file into DB Object String
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

const newAccountValidation = async (email) => {
  const result = await userModel.findOne({ email: email });
  return result == null;
};

const findUser = async (email) => {
  const result = await userModel.findOne({ email: email });
  return result;
};

// Sign Up Route
router.post('/signup', upload.single('avatar'), (req, res) => {
  const avatar = req.file.destination + '/' + req.file.filename;
  const newUser = new userModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    color: req.body.color,
    avatar: avatar,
  });

  newAccountValidation(req.body.email).then(function (valid) {
    if (valid) {
      newUser.profiles.push({
        name: req.body.firstName,
        avatar: avatar,
        color: req.body.color,
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

// Landing Page Email Verification
router.post('/email_verification', (req, res) => {
  newAccountValidation(req.body.email).then(function (valid) {
    if (valid) {
      res.status(200).send({ status: 'success' });
    } else {
      res.status(400).send({ message: 'Email is already in use!' });
    }
  });
});

// Sign In Route
router.post('/signin', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  findUser(email).then(function (user) {
    if (user && password == user.password) {
      res.status(200).send({ message: 'User logged in successfully!', user });
    } else {
      res.status(400).send({ message: 'Incorrect email or password!' });
    }
  });
});

// Update Profile Route
router.post(
  '/update_profile',
  upload.single('avatar'),
  async function (req, res) {
    const email = req.body.email;
    const name = req.body.name;
    const avatar = req.file.destination + '/' + req.file.filename;
    try {
      const request = await userModel.findOneAndUpdate(
        { email: email, profiles: { $elemMatch: { name: name } } },
        {
          $set: {
            'profiles.$.avatar': avatar,
          },
        }, // list fields you like to change
        { new: true, setDefaultsOnInsert: false, upsert: true }
      );
      const response = await request;
      console.log(response);
      res.json(response);
    } catch (error) {
      res.status(400, {
        message: 'There was an error with your request, please try again.',
      });
    }
  }
);

module.exports = router;
