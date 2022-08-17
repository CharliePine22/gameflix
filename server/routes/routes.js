const express = require('express');
const router = express.Router();
const newUserModel = require('../models/NewUserModels');
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
  const result = await newUserModel.findOne({ email: email });
  console.log(result);
  return result == null;
};

// Sign Up Route
router.post('/signup', upload.single('avatar'), (req, res) => {
  const avatar = req.file.destination + '/' + req.file.filename;
  const newUser = new newUserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    color: req.body.color,
    avatar: avatar,
  });

  newUser.insertOne({
    profiles: { username: req.body.firstName, profile_pic: avatar },
  });

  newAccountValidation(req.body.email).then(function (valid) {
    if (valid) {
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

router.post('/email_verification', (req, res) => {
  newAccountValidation(req.body.email).then(function (valid) {
    if (valid) {
      res.status(200).send({ status: 'success' });
    } else {
      res.status(400).send({ message: 'Email is already in use!' });
    }
  });
});

module.exports = router;
