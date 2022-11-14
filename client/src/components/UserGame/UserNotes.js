import React from 'react';
import './UserNotes.css';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const UserGameNotes = () => {
  return (
    <div className='user_notes__wrapper'>
      <div className='user_notes__header'>
        <h4>Notes</h4>
      </div>
      <div className='user_notes__notes'></div>
      <div className='user_notes__form_container'>
        <form className='user_notes__form'></form>
      </div>
    </div>
  );
};

export default UserGameNotes;
