const express = require('express');
const router = express.Router();
const noteModel = require('../models/UserNotesModel');

router.put('/update_notes', async (req, res) => {
  const gameId = req.body.gameId;
  const notes = req.body.notes;
  const userNotesId = req.body.profile.notesId;

  // const noteId = mongoose.Types.ObjectId();

  noteModel.find({}, function (err, allNotes) {
    const currentUserNotes = allNotes.filter((item) =>
      item.notesID.equals(userNotesId)
    )[0];

    const idx = currentUserNotes.notes_collection.findIndex(
      (game) => game.id == gameId
    );

    if (idx == -1) currentUserNotes.notes_collection.push(notes);
    else {
      currentUserNotes.notes_collection[idx] = notes;
    }
    currentUserNotes.save();
    res.json(currentUserNotes.notes_collection[idx]);
    return;
  });
});

router.get('/get_notes', async (req, res) => {
  const notesId = req.query.id;
  const userNotes = await noteModel.findOne({ notesID: notesId });
  if (userNotes == null) res.send([]);
  else res.send(userNotes);
});

module.exports = router;
