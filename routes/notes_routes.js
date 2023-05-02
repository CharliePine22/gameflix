const express = require('express');
const router = express.Router();
const noteModel = require('../models/UserNotesModel');
const userModel = require('../models/NewUserModels');
const mongoose = require('mongoose');

router.post('/create_note', async (req, res) => {
  const noteId = mongoose.Types.ObjectId();
  const profileName = req.body.profile;
  const email = req.body.email;

  const newNote = new noteModel({
    notesID: noteId,
    notes_collection: [],
  });

  try {
    const request = await userModel.findOneAndUpdate(
      {
        email: email,
      },
      {
        $set: {
          'profiles.$[el].notesId': noteId,
        },
      },
      { arrayFilters: [{ 'el.name': profileName }], new: true }
    );

    if (request == null) {
      res.send({
        code: 400,
        status: 'NOT OK',
        message: 'Unable to create a new note, please try again!',
        response: request,
      });
    } else {
      const currentProfile = request.profiles.filter(
        (profile) => profile.name === profileName
      );
      newNote.save();
      res.send({
        code: 200,
        status: 'OK',
        message: 'Note created!',
        response: { profile: currentProfile[0] },
      });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(400, {
      message: 'There was an error with your request, please try again.',
    });
  }
});

router.put('/update_notes', async (req, res) => {
  const notesId = req.body.noteId;
  const notesCollection = req.body.notes;
  const userNotesId = req.body.userNotesId;

  const request = await noteModel.findOneAndUpdate(
    { notesID: userNotesId },
    {
      $addToSet: {
        notes_collection: notesCollection,
      },
    },
    { arrayFilters: [{ 'el.id': notesId }], new: true }
  );
  res.send(request);
});

router.get('/get_notes', async (req, res) => {
  const notesId = req.query.id;
  const userNotes = await noteModel.findOne({ notesID: notesId });
  if (userNotes == null) res.send([]);
  else res.send(userNotes);
});

module.exports = router;
