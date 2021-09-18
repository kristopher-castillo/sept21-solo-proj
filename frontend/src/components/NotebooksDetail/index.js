import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink, useHistory, useParams } from "react-router-dom";
import {
  getNotebooks,
  updateNotebookTitle,
  deleteOneNotebook
} from "../../store/notebooks";
import "./NotebooksDetail.css";



const NotebooksDetail = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const allNotes = useSelector((state) => state.notes.notes);
  const notebooksState = useSelector((state) => state.notebooks.notebooks);
  const notebooks = notebooksState.filter((notebook) => notebook?.userId === sessionUser?.id)
  const { id } = useParams();
  const currentNotebook = notebooks.find((notebook) => notebook?.id === parseInt(id, 10));
  const history = useHistory();
  const dispatch = useDispatch();

  const [showNotesList, setShowNotesList] = useState("none");

  const notes = allNotes.filter(
    (note) =>
      note.userId === currentNotebook?.userId &&
      note.notebookId === currentNotebook?.id
  );

  
  const updateNotebooksTitleAction = (newTitle, noteId) => {
    dispatch(updateNotebookTitle(newTitle, noteId));
    // setTitle(newTitle);
  };

  const deleteNotebooksAction = (selectedNoteId) => {
    dispatch(deleteOneNotebook(selectedNoteId));
  };


  useEffect(() => {
    dispatch(getNotebooks());
  }, [dispatch]);


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

  const deleteButton = (
    <button
      type="button"
      onClick={() => {
        deleteNotebooksAction(currentNotebook.id);
        history.push("/notebooks");
      }}
    >
      Delete
    </button>
  );

  return (
    <div className="notebooksPageContainer">
      <div className="notesListContainer">
        <div className="notebooksNotesBar">
          <h2
            className="notesBarTitle"
            contentEditable="true"
            suppressContentEditableWarning={true}
            onBlur={(e) =>
              updateNotebooksTitleAction(e.target.innerText, currentNotebook?.id)
            }
          >
            {currentNotebook?.title}
          </h2>
          {notesList}
          <button
            className="addNoteBtn"
            type="button"
            onClick={() => {
              history.push("/notes");
            }}
          >
            Add a Note
          </button>
          {deleteButton}
        </div>
      </div>
    </div>
  );

}

export default NotebooksDetail;