import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes, createNewNote } from "../../store/notes";
import { getNotebooks } from "../../store/notebooks";
import { Redirect, NavLink, useHistory } from "react-router-dom";
import "./NotesPage.css"

const NotesPage = () => {
  const sessionUser = useSelector(state => state.session.user);
  let allNotes = useSelector(state => state.notes.notes);
  const allNotebooks = useSelector((state) => state.notebooks.notebooks);
  const notebooks = allNotebooks.filter((notebook) => notebook.userId === sessionUser?.id);
  const notes = allNotes.filter((note) => note.userId === sessionUser?.id)
  const history = useHistory();
  console.log("Notebooks", notebooks)

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showForm, setShowForm] = useState("");
  const [selectedNotebook, setSelectedNotebook] = useState(notebooks[0]?.id);

  console.log('SelectedNotebook', selectedNotebook);

  const reset = () => {
    setTitle('');
    setContent('');
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes())
  }, [dispatch])

  useEffect(() => {
    dispatch(getNotebooks());
  }, [dispatch]);
  
  const selectedNoteAction = (note) => {
    setShowForm("none");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title,
      content,
      userId: sessionUser.id,
      notebookId: selectedNotebook
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

  if (!selectedNotebook) {
    setSelectedNotebook(1);
  }

  let notesMap = (
        notes.map((note) => (
          <li key={note.id}>
          <NavLink to={`/notes/${note.id}`}>{note.title}</NavLink>
          <p className="notesDate">
            {new Date(Date.parse(note.updatedAt)).toDateString()}
          </p>
        </li>
      ))
  );
  
  // const currentNotebookIds = 
  
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
            <div className="newNoteBtns">
              <button className="submitNoteBtn" type="submit">
                Submit
              </button>
              <label>Select a notebook to safely store your note:</label>
              <select name="chooseNotebookBtn" id="chooseNotebookBtn" onChange={(e) => setSelectedNotebook(e.target.value)}>
                {notebooks.map((notebook) => (
                  <option key={notebook.id} value={notebook.id}>{notebook.title}</option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NotesPage;
