const express = require('express');
const router = express.Router();
const noteModel = require('../models/UserNotesModel');
const userModel = require('../models/NewUserModels');
const mongoose = require('mongoose');

router.put('/update_notes', async (req, res) => {
  const gameId = req.body.gameId;
  const notesCollection = req.body.notes;
  const profileName = req.body.profile.name;
  const userNotesId = req.body.profile.notesId;
  const email = req.body.email;
  const noteId = mongoose.Types.ObjectId();

  const request = await noteModel.findOneAndUpdate(
    { notesId: new mongoose.Types.ObjectId(userNotesId), gameId: gameId },
    {
      $addToSet: {
        notes_collection: notesCollection,
      },
    },
    { arrayFilters: [{ 'element.id': { $eq: gameId } }], new: true }
  );

  res.send(request);
  return;

  if (!request) {
    const newNote = new noteModel({
      notesID: noteId,
      notes_collection: notesCollection,
    });
    console.log('CREATING NEW NOTE MODEL');

    await userModel.findOneAndUpdate(
      {
        email: email,
      },
      {
        $set: {
          'profiles.$[el].notesId': noteId.toString(),
        },
      },
      { arrayFilters: [{ 'el.name': profileName }], new: true }
    );
    newNote.save();
    res.send(newNote);
    return;
  } else {
    res.send(request);
    return;
  }
});

router.get('/get_notes', async (req, res) => {
  const notesId = req.query.id;
  const userNotes = await noteModel.findOne({ notesID: notesId });
  if (userNotes == null) res.send([]);
  else res.send(userNotes);
});

module.exports = router;
