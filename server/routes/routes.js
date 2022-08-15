const express = require('express');
const router = express.Router();
const newUserModel = require('../models/NewUserModels');

router.post('/signup', (req, res) => {
  const newUser = new newUserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  newUser
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      response.json(error);
    });
});

module.exports = router;
