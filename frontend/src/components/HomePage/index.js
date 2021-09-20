import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNotes } from "../../store/notes";
import { getNotebooks } from "../../store/notebooks";
import { NavLink, useHistory } from "react-router-dom";
import image from "../images/header-pic-pen.jpeg";
import "./HomePage.css"

const HomePage = () => {
  const sessionUser = useSelector(state => state.session.user);
  let allNotes = useSelector(state => state.notes.notes);
  const allNotebooks = useSelector((state) => state.notebooks.notebooks);
  const notebooks = allNotebooks.filter((notebook) => notebook.userId === sessionUser?.id);
  const notes = allNotes.filter((note) => note.userId === sessionUser?.id)
  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getNotebooks());
  }, [dispatch]);

  const notesMap = notes.map((note) => (
    <button
      className="noteBtn"
      type="button"
      key={note.id}
      onClick={() => history.push(`/notes/${note.id}`)}
    >
      {note.title}
      <p className="notesDate">
        {new Date(Date.parse(note.updatedAt)).toDateString()}
      </p>
    </button>
  ));

  const notebooksMap = notebooks.map((notebook) => (
    <button
      className="notebookBtn"
      type="button"
      key={notebook.id}
      onClick={() => history.push(`/notebooks/${notebook.id}`)}
    >
      {notebook.title}
    </button>
  ));

  if (!sessionUser) {
    return (
      <div>
        <div className="homePageContainer">
          <div className="homePageHeader">
            <img src={image} alt="header"></img>
          </div>
          <div className="homePageBody">
            <div className="welcomeContainer">
              <div className="welcomeLinks">
                <h1>Welcome to Forevernote!</h1>
                <NavLink to="/login">Login Here</NavLink>
                <NavLink to="/signup">Not registered? Click here</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="homePageContainer">
          <div className="homePageHeader">
            <img src={image} alt="header"></img>
          </div>
          <div className="homePageBody">
            <div className="notesViewTitle">
              <p onClick={() => history.push(`/notes`)}>Your Notes</p>
            </div>
            <div className="notesView">
              {notesMap}
            </div>
            <div className="notebooksViewTitle">
              <p onClick={() => history.push(`/notebooks`)}>Your Notebooks</p>
            </div>
            <div className="notebooksView">{notebooksMap}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;