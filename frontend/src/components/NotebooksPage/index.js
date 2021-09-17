import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotebooks, createNewNotebook, updateNotebookTitle, updateOneNotebook, deleteOneNotebook} from "../../store/notebooks";
import { Redirect, NavLink, useHistory } from "react-router-dom";
import "./NotebooksPage.css"

const NotebooksPage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  // const allNotes = useSelector((state) => state.notes.notes);
  // const notes = allNotes.filter((note) => note.userId === sessionUser?.id);
  const allNotebooks = useSelector((state) => state.notebooks);
  console.log(allNotebooks)
  const notebooks = allNotebooks.filter((notebook) => notebook?.userId === sessionUser?.id);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getNotebooks());
    }, [dispatch]);

  return (
    <>
      <div>
        <div className="notebooksPageContainer">
          <h2>Your Notebooks</h2>
          <div className="notebooksBar">
            {/* <ul>
              {notebooks.map((notebook) => (
                <li key={notebook.id}>
                  <NavLink to={`/notebooks/${notebook.id}`}>{notebook.title}</NavLink>
                </li>
              ))}
            </ul> */}
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
