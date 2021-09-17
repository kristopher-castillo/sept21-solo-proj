import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes,  createNewNote, updateOneNote, updateNoteTitle, deleteOneNote} from "../../store/notes";
import { Redirect, NavLink, useHistory } from "react-router-dom";
import "./NotebooksPage.css"

const NotebooksPage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const allNotes = useSelector((state) => state.notes.notes);
  const notes = allNotes.filter((note) => note.userId === sessionUser?.id);
  const allNotebooks = useSelector((state) => state.notebooks.notebooks);
  const notebooks = allNotebooks.filter((notebook) => notebook.userId === sessionUser?.id);
  
  

  return (
    <>
      <div>
        <p>This is the Notebooks Page!</p>
        <div className="notebooksPageContainer">
          <div className="notebooksBar">
            <ul>
              {notes.map((note) => (
                <li key={note.id} onClick={() => selectedNoteAction(note)}>
                  <NavLink to={`/notes/${note.id}`}>{note.title}</NavLink>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setShowForm("");
                setShowNote("none");
                history.push("/notes");
              }}>
              Add a Note
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotebooksPage;
