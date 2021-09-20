import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getNotes } from "../../store/notes";
import { getNotebooks, createNewNotebook } from "../../store/notebooks";
import { Redirect, NavLink, useHistory } from "react-router-dom";
import "./NotebooksPage.css"

const NotebooksPage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  // const allNotes = useSelector((state) => state.notes.notes);
  const allNotebooks = useSelector((state) => state.notebooks.notebooks);
  const history = useHistory();


  const [title, setTitle] = useState('');
  const [showForm, setShowForm] = useState("none");
  // const [selectedNotebook, setSelectedNotebook] = useState('');
  // const [showNotebook, setShowNotebook] = useState("none");
  // const notes = allNotes.filter((note) => note.userId === selectedNotebook.userId && note.notebookId === selectedNotebook?.id);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotebooks());
  }, [dispatch]);

  const reset = () => {
    setTitle("");
  };

  //  useEffect(() => {
  //    dispatch(getNotes());
  //  }, [dispatch]);

  // const selectedNotebookAction = notebook => {
  //   setSelectedNotebook(notebook);
  //   // setShowNotesList('')
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNotebook = {
      title,
      userId: sessionUser.id
    };
    const lastNotebook = await dispatch(createNewNotebook(newNotebook));
    // selectedNotebookAction(lastNotebook);
    history.push(`/notebooks/${lastNotebook.id}`);
    reset();
  };

  if (!sessionUser) return <Redirect to="/" />;

  let notebooks;
  let notebookList
  if (allNotebooks) {
    notebooks = allNotebooks.filter((notebook) => notebook.userId === sessionUser?.id);
    notebookList = (
      <ul className="notebookList">
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
      <div className="notebooksPageContainer">
        <div className="notebooksBar">
          <h2 className="notebooksBarTitle">Your Notebooks</h2>
          {notebookList}
          <button
            className="newNotebookBtn"
            type="button"
            onClick={() => setShowForm("")}
          >
            Add a Notebook
          </button>
        <div className="newNotebookContainer" style={{ display: showForm }}>
          <h1>New Notebook</h1>
          <form onSubmit={handleSubmit}>
            <input
              className="titleInput"
              value={title}
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              placeholder="Add your title here"
            />

            <button className="submitNoteBtn" type="submit">
              Submit
            </button>
          </form>
        </div>
        </div>
      </div>
    </>
  );
};

export default NotebooksPage;
