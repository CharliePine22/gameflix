const express = require('express');
const router = express.Router();
const noteModel = require('../models/UserNotesModel');
const userModel = require('../models/NewUserModels');
const mongoose = require('mongoose');

// Find user helper function
const findUser = async (email) => {
  const result = await userModel.findOne({ email: email });
  return result;
};

router.put('/create_note', async (req, res) => {
  const noteId = mongoose.Types.ObjectId();
  const profileName = req.body.profile;
  const email = req.body.email;

  const newNote = new noteModel({
    notesID: noteId,
    notes_collection: [],
  });

  try {
    const request = await userModel.findOne({ email: email });
    const currentProfile = request.profiles.filter(
      (profile) => profile.name === profileName
    )[0];
    currentProfile.notesId = noteId;
    request.save();
    newNote.save();
    res.send(request);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.get('/get_notes', async (req, res) => {
  res.send(result);
  return;
});

module.exports = router;
