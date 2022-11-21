const mongoose = require('mongoose');
const MyObjectId = mongoose.Types.ObjectId;

const userNotesModel = new mongoose.Schema({
  notesID: {
    type: Number,
    required: true,
  },
  notes: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('notes', userNotesModel);
