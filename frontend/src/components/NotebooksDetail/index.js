import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  getNotebooks,
  updateNotebookTitle,
  deleteOneNotebook
} from "../../store/notebooks";
import {
  getNotes,
  createNewNote,
  updateNoteContent,
  updateNoteTitle,
  deleteOneNote,
} from "../../store/notes";
import "./NotebooksDetail.css";



const NotebooksDetail = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const notesState = useSelector((state) => state.notes.notes);
  const notebooksState = useSelector((state) => state.notebooks.notebooks);
  const notebooks = notebooksState.filter((notebook) => notebook?.userId === sessionUser?.id)
  const { id } = useParams();
  const currentNotebook = notebooks.find((notebook) => notebook?.id === parseInt(id, 10));
  const history = useHistory();
  const dispatch = useDispatch();


  const [showNote, setShowNote] = useState('none')
  const [showWelcome, setShowWelcome] = useState('');
  const [selectedNote, setSelectedNote] = useState('');
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState('none');

  const notes = notesState.filter(
    (note) =>
      note.userId === currentNotebook?.userId &&
      note.notebookId === currentNotebook?.id
  );

  const reset = () => {
    setTitle("");
    setContent("");
  };

  const updateNotebooksTitleAction = (newTitle, noteId) => {
    dispatch(updateNotebookTitle(newTitle, noteId));
    // setTitle(newTitle);
  };

  const deleteNotebooksAction = (selectedNoteId) => {
    dispatch(deleteOneNotebook(selectedNoteId));
  };

  const updateNoteTitleAction = (newTitle, noteId) => {
    dispatch(updateNoteTitle(newTitle, noteId));
    // setTitle(newTitle);
  };

  const updateNoteContentAction = (newContent, noteId) => {
    dispatch(updateNoteContent(newContent, noteId));
    // setContent(newContent);
  };

  const deleteNoteAction = (selectedNoteId) => {
    dispatch(deleteOneNote(selectedNoteId));
    setShowWelcome('');
    setShowNote('none');
  };

  const selectedNoteAction = (note) => {
    setSelectedNote(note);
    setShowWelcome('none');
    setShowForm('none');
    setShowNote('');
  }

  const addNoteAction = (note) => {
    setSelectedNote(note);
    setShowWelcome("none");
    setShowNote("");
  }

  useEffect(() => {
    dispatch(getNotebooks());
  }, [dispatch]);

    useEffect(() => {
      dispatch(getNotes());
    }, [dispatch]);

  let notesList;
  notesList = (
    <ul className="notesList">
      {notes.map((note) => (
        <li key={note.id} onClick={() => selectedNoteAction(note)}>
          {note.title}
          <p className="notesDate">
            {new Date(Date.parse(note.updatedAt)).toDateString()}
          </p>
        </li>
      ))}
    </ul>
  );

  const deleteNotebookButton = (
    <button
      className="deleteNotebookBtn"
      type="button"
      onClick={() => {
        deleteNotebooksAction(currentNotebook.id);
        history.push(`/notebooks/`);
      }}
    >
      Delete this Notebook
    </button>
  );
  const deleteNoteButton = (
    <button
      type="button"
      onClick={() => {
        deleteNoteAction(selectedNote.id);
        history.push(`/notebooks/${currentNotebook.id}`);
      }}
    >
      Delete
    </button>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title,
      content,
      userId: sessionUser.id,
      notebookId: currentNotebook.id
    };
    const lastNote = await dispatch(createNewNote(newNote));
    addNoteAction(lastNote);
    setShowForm('none');
    reset();
  };

  return (
    <div className="notebooksPageContainer">
      <div className="notesListContainer">
        <div className="notebooksNotesBar">
          <h2
            className="notesBarTitle"
            contentEditable="true"
            suppressContentEditableWarning={true}
            onBlur={(e) =>
              updateNotebooksTitleAction(
                e.target.innerText,
                currentNotebook?.id
              )
            }
          >
            {currentNotebook?.title}
          </h2>
          {notesList}
          <button
            className="addNoteBtn"
            type="button"
            onClick={() => {
              setShowForm('');
              setShowNote('none');
              setShowWelcome('none');
            }}
          >
            Add a Note
          </button>
          {deleteNotebookButton}
        </div>
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
      <div className="notebookWelcome" style={{ display: showWelcome }}>
        <p>Choose a Note!</p>
      </div>
      <div className="notebookNoteContainer" style={{ display: showNote }}>
        <div className="noteTitle">
          <h2
            contentEditable="true"
            suppressContentEditableWarning={true}
            onBlur={(e) =>
              updateNoteTitleAction(e.target.innerText, selectedNote?.id)
            }
          >
            {selectedNote?.title}
          </h2>
          <div className="noteContent">
            <pre
              contentEditable="true"
              suppressContentEditableWarning={true}
              onBlur={(e) =>
                updateNoteContentAction(e.target.innerText, selectedNote?.id)
              }
            >
              {selectedNote?.content}
            </pre>
            {deleteNoteButton}
          </div>
        </div>
      </div>
    </div>
  );

}

export default NotebooksDetail;