const mongoose = require('mongoose');

const userNotesModel = new mongoose.Schema({
  notesID: {
    type: mongoose.ObjectId,
    required: true,
  },
  notes_collection: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('notes', userNotesModel);
