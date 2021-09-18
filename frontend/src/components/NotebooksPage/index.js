import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../../store/notes";
import { getNotebooks, createNewNotebook, updateNotebookTitle, updateOneNotebook, deleteOneNotebook} from "../../store/notebooks";
import { Redirect, NavLink, useHistory } from "react-router-dom";
import "./NotebooksPage.css"

const NotebooksPage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const allNotes = useSelector((state) => state.notes.notes);
  const allNotebooks = useSelector((state) => state.notebooks).notebooks;
  const history = useHistory();


  const [title, setTitle] = useState('');
  const [showForm, setShowForm] = useState("");
  const [showNotebooks, setShowNotebooks] = useState('');
  const [showNotesList, setShowNotesList] = useState('none');
  const [selectedNotebook, setSelectedNotebook] = useState('');
  const [showNote, setShowNote] = useState("none");
  const notes = allNotes.filter((note) => note.userId === selectedNotebook.userId && note.notebookId === selectedNotebook?.id);
  console.log('NOTES', notes)
  console.log('SELECTED NOTEBOOK', selectedNotebook)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotebooks());
  }, [dispatch]);

   useEffect(() => {
     dispatch(getNotes());
   }, [dispatch]);

  const selectedNotebookAction = notebook => {
    setSelectedNotebook(notebook);
    setShowNotebooks('none');
    setShowNotesList('')
  }

  const addNoteAction = note => {
    
  }

  let notebooks;
  let notebookList
  if (allNotebooks) {
    notebooks = allNotebooks.filter((notebook) => notebook.userId === sessionUser?.id);
    notebookList = (
      <ul className="notebookList">
        {notebooks.map((notebook) => (
          <li key={notebook.id} onClick={() => selectedNotebookAction(notebook)}>
            <NavLink to={`/notebooks/${notebook.id}`}>{notebook.title}</NavLink>
          </li>
        ))}
    </ul>
    )
  }

  let notesList;
  notesList = (
    <ul className="notesList">
      {notes.map((note) => (
        <li key={note.id}>
          <NavLink to={`/notes/${note.id}`}>{note.title}</NavLink>
          <p className="notesDate">
            {new Date(Date.parse(note.updatedAt)).toDateString()}
          </p>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div>
        <div className="notebooksPageContainer">
          <div className="notebooksBar" style={{ display: showNotebooks }}>
            <h2 className="notebooksBarTitle">Your Notebooks</h2>
            {notebookList}
            <button className="newNotebookBtn" type="button">
              Add a Notebook
            </button>
          </div>
          <div className="notesList" style={{ display: showNotesList }}>
            {notesList}
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
        </div>
      </div>
    </>
  );
};

export default NotebooksPage;
