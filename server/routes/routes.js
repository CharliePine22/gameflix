const express = require('express');
const router = express.Router();
const newUserModel = require('../models/NewUserModels');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Sign Up Route
router.post('/signup', upload.single('avatar'), (req, res) => {
  console.log(req.file);
  const avatar = req.file.destination + '/' + req.file.filename;
  const newUser = new newUserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    color: req.body.color,
    avatar: avatar,
  });
  newUser
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
