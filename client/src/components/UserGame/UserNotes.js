import React, { useState, useEffect, useRef } from 'react';
import './UserNotes.css';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdEditNote } from 'react-icons/md';
import { FaAngleDown } from 'react-icons/fa';
import NoteDetails from './NoteDetails';

// Get current date and format it
const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate();
if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;
const formattedToday = mm + '/' + dd + '/' + yyyy;

const UserGameNotes = ({
  windowViewHandler,
  viewStatus,
  gameNotes,
  updateNotes,
}) => {
  // Tab Hooks
  const [currentTab, setCurrentTab] = useState('');
  const [editingTab, setEditingTab] = useState(false);
  const [tabValue, setTabValue] = useState('');
  const [addingTab, setAddingTab] = useState(false);
  const [addingNote, setAddingNote] = useState(false);
  // Note Hooks
  const [noteValue, setNoteValue] = useState('');
  const [currentNote, setCurrentNote] = useState(null);
  let noteTab = gameNotes?.tabs?.filter(
    (item) => item.tabName == currentTab
  )[0];
  const notesRef = useRef(null);
  const tabRef = useRef(null);
  const tabEndRef = useRef(null);

  useEffect(() => {
    if (!gameNotes) return;
    setCurrentTab(gameNotes?.tabs[0]?.tabName);
  }, [gameNotes]);

  useEffect(() => {
    if (currentNote !== null) return;
    tabRef.current.focus();
    setEditingTab(false);
    setNoteValue('');
    setTabValue('');
  }, [tabRef, noteTab]);

  useEffect(() => {
    if (!addingNote) return;
    notesRef.current.scrollIntoView({ behavior: 'smooth' });
    setAddingNote(false);
    return () => clearTimeout(timer);
  }, [addingNote]);

  const editTabHandler = () => {
    if (!editingTab) {
      setEditingTab(true);
    } else {
      if (tabRef.current.innerText == '' || tabRef.current.innerText == '/n') {
        console.log('EMPTY');
        noteTab.tabName = 'Notes';
        return;
      } else {
        noteTab.tabName = tabRef.current.innerText;
      }
      updateNotes();
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
    setAddingNote(true);
    noteTab.notes.push({
      id: noteTab.notes.length + 1,
      note: noteValue,
      date: formattedToday,
    });
    updateNotes();
    setNoteValue('');
  };

  const tabFormSubmitHandler = async (e) => {
    e.preventDefault();
    if (tabValue == '') return;
    gameNotes.tabs.push({
      tabName: tabValue,
      notes: [],
    });
    setCurrentTab(tabValue);
    updateNotes();
    setTabValue('');
    setAddingTab(false);
  };

  const viewNoteHandler = (note) => {
    setCurrentNote(note);
    setAddingTab(false);
    setEditingTab(false);
  };

  const saveNoteHandler = (oldNote, newNote) => {
    oldNote.note = newNote;
    oldNote.date = formattedToday;
    updateNotes();

    setCurrentNote(null);
  };

  const deleteNoteHandler = (note) => {
    const updatedList = noteTab.notes.filter((item) => item.note !== note);
    noteTab.notes = updatedList;
    updateNotes();

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
          display: currentNote && 'none',
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
              // onKeyPress={(e) => {
              //   e.preventDefault();
              //   console.log(e.currentTarget);
              //   if (e.key === 'Enter') editTabHandler();
              // }}
              onKeyDown={(e) => {
                e.preventDefault();
                // setTabValue(e.currentTarget.innerText);
                console.log(e.currentTarget.innerText);
                if (e.key === 'Enter') editTabHandler();
              }}
            >
              <p
                ref={tabRef}
                style={{
                  borderBottom: editingTab
                    ? '2px solid #9147ff'
                    : '2px solid transparent',
                  userSelect: editingTab ? 'auto' : 'none',
                  padding: '14px 6px 0',
                  transition: 'all 200ms',
                  lineHeight: '28px',
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
                {gameNotes?.tabs.map((item) => (
                  <li
                    key={item.tabName}
                    className='user_notes__tab'
                    onClick={() => setCurrentTab(item.tabName)}
                    style={{
                      borderBottom:
                        currentTab == item.tabName && '1px solid transparent',
                    }}
                  >
                    {item.tabName}
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
              {gameNotes?.tabs?.filter((item) => item.tabName == currentTab)[0]
                ?.notes?.length > 0 ? (
                gameNotes?.tabs
                  ?.filter((item) => item.tabName == currentTab)[0]
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
              <div
                ref={notesRef}
                style={{ width: '10px', marginLeft: '5px' }}
              />
            </ul>
          </div>
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
