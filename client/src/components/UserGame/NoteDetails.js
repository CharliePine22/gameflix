import React, { useState } from 'react';
import './UserNotes.css';
import { BsArrowLeft } from 'react-icons/bs';

const NoteDetails = ({ note, closeNote, updateNote, deleteNote }) => {
  const [noteValue, setNoteValue] = useState(note.note);

  return (
    <div className='note_details__container'>
      <span className='note_details__date'>{note.date}</span>
      <BsArrowLeft className='note_details__back_icon' onClick={closeNote} />
      <div className='note_details__details'>
        <h4 className='note_details_note'>Note Details</h4>
        <textarea
          value={noteValue}
          onChange={(e) => setNoteValue(e.target.value)}
          className='note_details__editor'
        />
      </div>
      <div className='note_details__actions'>
        <button onClick={() => updateNote(note, noteValue)}>Save Note</button>
        <button onClick={() => deleteNote(note.note)}>Delete Note</button>
      </div>
    </div>
  );
};

export default NoteDetails;
