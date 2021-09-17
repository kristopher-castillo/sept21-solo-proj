import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes,  createNewNote, updateNoteContent, updateNoteTitle, deleteOneNote} from "../../store/notes";
import { Redirect, NavLink, useHistory } from "react-router-dom";
import "./NotesPage.css"

const NotesPage = () => {
  const sessionUser = useSelector(state => state.session.user);
  let allNotes = useSelector(state => state.notes.notes);
  const notes = allNotes.filter((note) => note.userId === sessionUser?.id)
  const history = useHistory();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showForm, setShowForm] = useState("");
  const [showNote, setShowNote] = useState('none');
  const [selectedNote, setSelectedNote] = useState('')
  // const [currentNotes, setCurrentNotes] = useState(notes)

  const reset = () => {
    setTitle('');
    setContent('');
  }

  const dispatch = useDispatch();

  // console.log("Selected Note -----", selectedNote)
  // console.log("User ----", sessionUser)
  // // console.log("currentNotes ------", currentNotes)

  useEffect(() => {
    dispatch(getNotes())
  }, [dispatch])
  
  const selectedNoteAction = (note) => {
    setSelectedNote(note);
    setShowForm("none");
    setShowNote('');
  }

  const deleteNoteAction = (selectedNoteId) => {
    dispatch(deleteOneNote(selectedNoteId));
    setShowForm('');
    setShowNote('none');
    return <Redirect to="/" />;
  }

  const updateNoteTitleAction = (newTitle, noteId) => {
    dispatch(updateNoteTitle(newTitle, noteId));
    setTitle(newTitle);
  }

  const updateNoteContentAction = (newContent, noteId) => {
    dispatch(updateNoteContent(newContent, noteId));
    setContent(newContent);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title,
      content,
      userId: sessionUser.id
    }
    const lastNote = await dispatch(createNewNote(newNote));
    selectedNoteAction(lastNote);
    history.push(`/notes/${lastNote.id}`)
    reset();
  }

  if (!sessionUser) return <Redirect to="/" />;

  if (!notes) {
    return null;
  }
  let notesMap = (
        notes.map((note) => (
          <li key={note.id} onClick={() => selectedNoteAction(note)}>
          <NavLink to={`/notes/${note.id}`}>{note.title}</NavLink>
          <p className="notesDate">
            {new Date(Date.parse(note.updatedAt)).toDateString()}
          </p>
        </li>
      ))
    );

  let deleteButton
  if (showForm === "none") {
    deleteButton = (
      <button type="button" onClick={() => {
        deleteNoteAction(selectedNote.id)
        history.push('/notes')
      }}>
        Delete
      </button>
    );
  } else {
    deleteButton = null;
  }
  
  return (
    <>
      <div className="notesPageContainer">
        <div className="notesBar">
          <h2 className="notesBarTitle">Your Notes</h2>
          <ul className="notesList">{notesMap}</ul>
          <button
            className="addNoteBtn"
            type="button"
            onClick={() => {
              setShowForm("");
              setShowNote("none");
              history.push("/notes");
            }}
          >
            Add a Note
          </button>
        </div>
        <div className="newNoteContainer" style={{ display: showForm }}>
          <h1>New Note</h1>
          <form onSubmit={handleSubmit}>
            <input
              className="titleInput"
              value={title}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              placeholder="Add your title here"
            />
            <textarea
              className="contentInput"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              name="content"
              placeholder="Your note..."
            ></textarea>
            <button className="submitNoteBtn" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="noteContainer" style={{ display: showNote }}>
          <div className="noteTitle">
            <h2
              contentEditable="true"
              suppressContentEditableWarning={true}
              onBlur={(e) =>
                updateNoteTitleAction(e.target.innerText, selectedNote.id)
              }
            >
              {selectedNote.title}
            </h2>
            <div className="noteContent">
              <pre
                contentEditable="true"
                suppressContentEditableWarning={true}
                onBlur={(e) =>
                  updateNoteContentAction(e.target.innerText, selectedNote.id)
                }
              >
                {selectedNote.content}
              </pre>
              {deleteButton}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotesPage;
