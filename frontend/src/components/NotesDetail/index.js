import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getNotes,
  updateNoteContent,
  updateNoteTitle,
  deleteOneNote,
} from "../../store/notes";
import { useParams, NavLink, useHistory, Redirect } from "react-router-dom";


const NotesDetail = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const notesState = useSelector((state) => state.notes.notes);
  const notes = notesState.filter((note) => note?.userId === sessionUser?.id);
  const { id } = useParams();
  const currentNote = notes.find((note) => note?.id === parseInt(id, 10))
  const dispatch = useDispatch();
  const history = useHistory();

  console.log("notes", notes)
  console.log("id", id)
  console.log("currentNote", currentNote)

  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  if (!sessionUser) return <Redirect to="/" />;

  if (!notes) {
    return null;
  }

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
  };

  let notesMap = notes.map((note) => (
    <li key={note.id}>
      <NavLink to={`/notes/${note.id}`}>{note.title}</NavLink>
      <p className="notesDate">
        {new Date(Date.parse(note.updatedAt)).toDateString()}
      </p>
    </li>
  ));
  
  const deleteButton = (
      <button
        type="button"
        onClick={() => {
          deleteNoteAction(currentNote.id);
          history.push("/notes");
        }}
      >
        Delete
      </button>
    );

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
              history.push("/notes");
            }}
          >
            Add a Note
          </button>
        </div>
      </div>
      <div className="noteContainer">
        <div className="noteTitle">
          <h2
            contentEditable="true"
            suppressContentEditableWarning={true}
            onBlur={(e) =>
              updateNoteTitleAction(e.target.innerText, currentNote?.id)
            }
          >
            {currentNote?.title}
          </h2>
          <div className="noteContent">
            <pre
              contentEditable="true"
              suppressContentEditableWarning={true}
              onBlur={(e) =>
                updateNoteContentAction(e.target.innerText, currentNote?.id)
              }
            >
              {currentNote?.content}
            </pre>
            {deleteButton}
          </div>
        </div>
      </div>
    </>
  );
}

export default NotesDetail;