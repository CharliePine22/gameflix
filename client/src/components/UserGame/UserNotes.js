import React, { useState, useEffect, useRef } from 'react';
import './UserNotes.css';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdEditNote } from 'react-icons/md';
import { FaAngleDown } from 'react-icons/fa';
import { IoTrashOutline } from 'react-icons/io5';
import axios from 'axios';
import NoteDetails from './NoteDetails';

// Get current date and format it
const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();
if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;
const formattedToday = mm + '/' + dd + '/' + yyyy;

const UserGameNotes = ({ game, profile, windowViewHandler, viewStatus }) => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const userEmail = localStorage.getItem('user');
  console.log(profile);

  const DUMMYDATA = [
    {
      id: 1,
      noteTitle: 'Thoughts',
      notes: [
        { note: 'Good pick up and put down game', date: '11/21/2022' },
        {
          note: 'Wish it was a more immersive coop experience (Do island together).',
          date: '11/21/2022',
        },
      ],
    },
    {
      id: 2,
      noteTitle: 'Stats',
      notes: [
        { note: 'Island name is Destiny', date: '11/21/2022' },
        { note: 'Island has 3 stars', date: '11/21/2022' },
        { note: '30/50 recipes unlocked', date: '11/21/2022' },
        { note: '540,424 Bells', date: '11/21/2022' },
      ],
    },
    {
      id: 3,
      noteTitle: 'Villagers',
      notes: [
        { note: 'Agent S', date: '11/21/2022' },
        { note: 'Cherri', date: '11/21/2022' },
        { note: 'Beardo', date: '11/21/2022' },
        { note: 'Tom Nook', date: '11/21/2022' },
      ],
    },
  ];
  // Tab Hooks
  const [currentTab, setCurrentTab] = useState('Thoughts');
  const [editingTab, setEditingTab] = useState(false);
  const [tabValue, setTabValue] = useState('');
  const [addingTab, setAddingTab] = useState(false);
  // Note Hooks
  const [noteValue, setNoteValue] = useState('');
  const [userNotes, setUserNotes] = useState(DUMMYDATA);
  const [currentNote, setCurrentNote] = useState(null);
  let noteTab = userNotes.filter((item) => item.noteTitle == currentTab)[0];
  const notesRef = useRef(null);
  const tabRef = useRef(null);
  const tabEndRef = useRef(null);

  const createNotes = async () => {
    const request = await axios.put(`${baseURL}/notes/create_note`, {
      email: userEmail,
      profile: profile.name,
    });

    console.log(request.data);
  };

  useEffect(() => {
    if (!profile.notes) {
      // const request = axios.get(`${baseURL}/notes/get_notes`);
      createNotes();
    }
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

  useEffect(() => {
    // tabEndRef.current.scrollIntoView({ behavior: 'smooth' });
    return () => clearTimeout(timer);
  }, []);

  const editTabHandler = () => {
    if (!editingTab) {
      setEditingTab(true);
    } else {
      noteTab.noteTitle = tabRef.current.innerText;
      setUserNotes((prev) => [...prev]);
      setCurrentTab(tabRef.current.innerText);
      setEditingTab(false);
    }
  };

  let timer;
  const addTabHandler = (e) => {
    e.stopPropagation();
    setAddingTab(true);
    timer = setTimeout(
      () => tabEndRef.current.scrollIntoView({ behavior: 'smooth' }),
      150
    );
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (noteValue == '') return;
    noteTab.notes.push(noteValue);
    setUserNotes((prev) => [...prev]);
    setNoteValue('');
  };

  const tabFormSubmitHandler = async (e) => {
    e.preventDefault();
    if (tabValue == '') return;

    const request = await axios.post(`${baseURL}/notes/create_note`, {
      id: game.id,
      tab: tabValue,
    });

    console.log(request);

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
    console.log(oldNote);
    oldNote.note = newNote;
    oldNote.date = formattedToday;
    setUserNotes((prev) => [...prev]);
    setCurrentNote(null);
  };

  const deleteNoteHandler = (note) => {
    const updatedList = noteTab.notes.filter((item) => item.note !== note);
    noteTab.notes = updatedList;
    setUserNotes((prev) => [...prev]);
    setCurrentNote(null);
  };

  return (
    <div
      className={`user_notes__wrapper ${
        !viewStatus.notes && 'minimized_notes'
      }`}
    >
      <FaAngleDown
        style={{
          transform: !viewStatus.notes ? 'rotate(0)' : 'rotate(180deg)',
        }}
        className='user_game__minimize_icon'
        onClick={() => windowViewHandler('notes')}
      />
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
                  // onClick={() => !addingTab && setAddingTab(true)}
                  onClick={addTabHandler}
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
                      <p
                        onClick={(e) => {
                          e.stopPropagation();
                          setAddingTab(false);
                        }}
                      >
                        X
                      </p>
                    </div>
                  )}
                </li>
                <div ref={tabEndRef} />
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
                      key={note.note}
                      className='user_note'
                      onClick={() => viewNoteHandler(note)}
                    >
                      {note.note}
                    </li>
                  ))
              ) : (
                <p className='no_notes_msg'>No Notes</p>
              )}
            </ul>
          </div>
          <div ref={notesRef} style={{ width: '10px', marginLeft: '5px' }} />
          <div
            className='user_notes__form_container'
            style={{ display: `${!viewStatus.notes ? 'none' : 'block'}` }}
          >
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
