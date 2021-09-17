import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotebooks, createNewNotebook, updateNotebookTitle, updateOneNotebook, deleteOneNotebook} from "../../store/notebooks";
import { Redirect, NavLink, useHistory } from "react-router-dom";
import "./NotebooksPage.css"

const NotebooksPage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  // const allNotes = useSelector((state) => state.notes.notes);
  // const notes = allNotes.filter((note) => note.userId === sessionUser?.id);
  const allNotebooks = useSelector((state) => state.notebooks).notebooks;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotebooks());
  }, [dispatch]);

  let notebooks;
  let notebookList
  if (allNotebooks) {
    notebooks = allNotebooks.filter((notebook) => notebook.userId === sessionUser?.id);
    notebookList = (
      <ul>
        {notebooks.map((notebook) => (
          <li key={notebook.id}>
            <NavLink to={`/notebooks/${notebook.id}`}>{notebook.title}</NavLink>
          </li>
        ))}
    </ul>
    )
  }


  return (
    <>
      <div>
        <div className="notebooksPageContainer">
          <h2>Your Notebooks</h2>
          <div className="notebooksBar">
          {notebookList}
            <button
              type="button">
              Add a Notebook
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotebooksPage;
