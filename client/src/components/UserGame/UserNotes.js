import React, { useState, useEffect, useRef } from 'react';
import './UserNotes.css';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdEditNote } from 'react-icons/md';
import { IoTrashOutline } from 'react-icons/io5';

import NoteDetails from './NoteDetails';

const UserGameNotes = () => {
  const today = new Date();
  const DUMMYDATA = [
    {
      id: 1,
      noteTitle: 'Thoughts',
      notes: [
        'Good pick up and put down game',
        'Wish it was a more immersive coop experience (Do island together).',
      ],
    },
    {
      id: 2,
      noteTitle: 'Stats',
      notes: [
        'Island name is Destiny',
        'Island has 3 stars',
        '30/50 recipes unlocked',
        '540,424 Bells',
      ],
    },
    {
      id: 3,
      noteTitle: 'Villagers',
      notes: ['Agent S', 'Cherri', 'Beardo', 'Tom Nook'],
    },
  ];
  const [currentTab, setCurrentTab] = useState('Thoughts');
  const [editingTab, setEditingTab] = useState(false);
  const [noteValue, setNoteValue] = useState('');
  const [tabValue, setTabValue] = useState('');
  const [userNotes, setUserNotes] = useState(DUMMYDATA);
  const [currentNote, setCurrentNote] = useState(null);
  const [addingTab, setAddingTab] = useState(false);
  let noteTab = userNotes.filter((item) => item.noteTitle == currentTab)[0];
  const notesRef = useRef(null);
  const tabRef = useRef(null);

  useEffect(() => {
    if (currentNote !== null) return;
    notesRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [userNotes, currentTab]);

  useEffect(() => {
    if (currentNote !== null) return;
    tabRef.current.focus();
    setEditingTab(false);
    setNoteValue('');
    setTabValue('');
  }, [tabRef, noteTab]);

  const editTabHandler = () => {
    if (!editingTab) {
      setEditingTab(true);
    } else {
      noteTab.noteTitle = tabRef.current.innerText;
      setUserNotes((prev) => [...prev]);
      setEditingTab(false);
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (noteValue == '') return;
    noteTab.notes.push(noteValue);
    setUserNotes((prev) => [...prev]);
    setNoteValue('');
  };

  const tabFormSubmitHandler = (e) => {
    e.preventDefault();
    if (tabValue == '') return;
    setUserNotes((prev) => [
      ...prev,
      {
        id: 4,
        noteTitle: tabValue,
        notes: [],
      },
    ]);
    setCurrentTab(tabValue);
    setTabValue('');
    setAddingTab(false);
  };

  const viewNoteHandler = (note) => {
    setCurrentNote(note);
  };

  const saveNoteHandler = (oldNote, newNote) => {
    const resultArr = noteTab.notes.map(function (x) {
      return x.replace(oldNote, newNote);
    });
    noteTab.notes = resultArr;
    setUserNotes((prev) => [...prev]);
    setCurrentNote(null);
  };

  const deleteNoteHandler = (note) => {
    const updatedList = noteTab.notes.filter((item) => item !== note);
    noteTab.notes = updatedList;
    setUserNotes((prev) => [...prev]);
    setCurrentNote(null);
  };

  return (
    <div className='user_notes__wrapper'>
      {currentNote ? (
        <NoteDetails
          note={currentNote}
          closeNote={() => setCurrentNote(null)}
          updateNote={saveNoteHandler}
          deleteNote={deleteNoteHandler}
        />
      ) : (
        <>
          <>
            <h4
              contentEditable={editingTab}
              suppressContentEditableWarning={true}
              onBlur={editTabHandler}
            >
              <p
                ref={tabRef}
                style={{
                  borderBottom: editingTab
                    ? '2px solid #9147ff'
                    : '2px solid transparent',
                  userSelect: editingTab ? 'auto' : 'none',
                  padding: '0px 6px',
                  transition: 'all 200ms',
                }}
              >
                {currentTab}
              </p>{' '}
              <MdEditNote
                className='edit_tab_icon'
                onClick={() => setEditingTab(!editingTab)}
              />{' '}
            </h4>
            <div className='user_notes__header'>
              <ul className='user_notes__tabs'>
                {userNotes.map((item) => (
                  <li
                    key={item.id}
                    className='user_notes__tab'
                    onClick={() => setCurrentTab(item.noteTitle)}
                    style={{
                      borderBottom:
                        currentTab == item.noteTitle && '1px solid transparent',
                    }}
                  >
                    {item.noteTitle}
                  </li>
                ))}
                <li
                  className={`user_notes__tab ${
                    addingTab ? 'add_tab' : 'new_tab'
                  }`}
                  onClick={() => !addingTab && setAddingTab(true)}
                >
                  {!addingTab ? (
                    <AiOutlinePlus />
                  ) : (
                    <div className='new_tab__container'>
                      <form onSubmit={tabFormSubmitHandler}>
                        <input
                          value={tabValue}
                          onChange={(e) => setTabValue(e.target.value)}
                        />
                      </form>
                      <p onClick={() => setAddingTab(false)}>X</p>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </>
          <div className='user_notes__notes_wrapper'>
            <ul className='user_notes__notes'>
              {userNotes.filter((item) => item.noteTitle == currentTab)[0]
                ?.notes?.length > 0 ? (
                userNotes
                  .filter((item) => item.noteTitle == currentTab)[0]
                  ?.notes.map((note) => (
                    <li
                      key={note}
                      className='user_note'
                      onClick={() => viewNoteHandler(note)}
                    >
                      {note}
                      {/* <IoTrashOutline className='delete_note_icon' /> */}
                    </li>
                  ))
              ) : (
                <p className='no_notes_msg'>No Notes</p>
              )}
              <div ref={notesRef} />
            </ul>
          </div>
          <div className='user_notes__form_container'>
            <form className='user_notes__form' onSubmit={formSubmitHandler}>
              <input
                value={noteValue}
                onChange={(e) => setNoteValue(e.target.value)}
                className='user_notes__input'
                placeholder='I think Clark Kent is Batman'
              />
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default UserGameNotes;
