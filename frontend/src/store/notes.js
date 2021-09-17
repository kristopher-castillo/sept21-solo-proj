import { csrfFetch } from "./csrf";

const LOAD = 'notes/LOAD';
const ADD = 'notes/ADD_NOTE';
const DELETE = 'notes/DELETE_NOTE';
const UPDATE = 'notes/UPDATE'
const UPDATE_TITLE = 'notes/UPDATE_TITLE'
const UPDATE_CONTENT = 'notes/UPDATE_CONTENT'

const load = notes => ({
  type: LOAD,
  notes
});

const addNote = newNote => ({
  type: ADD,
  newNote
});

const update = notes => ({
  type: UPDATE,
  notes
})
const updateTitle = title => ({
  type: UPDATE_TITLE,
  title
})
const updateContent = content => ({
  type: UPDATE_CONTENT,
  content
})

const deleteNote = noteToDelete => ({
  type: DELETE,
  noteToDelete
})

export const getNotes = () => async dispatch => {
  const response = await csrfFetch('/api/notes');

  if (response.ok) {
    const notes = await response.json();
    dispatch(load(notes));
  }
}

export const createNewNote = (noteData) => async dispatch => {
  const response = await csrfFetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteData),
  });

  if (response.ok) {
    const newNote = await response.json();

    dispatch(addNote(newNote));
    return newNote;
  }
}

export const updateOneNote = (note) => async dispatch => {
  const response = await csrfFetch(`/api/notes/${note.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note)
  });

  if (response.ok) {
    const updatedNote = await response.json();
    dispatch(update(updatedNote));
    return updatedNote;
  }
}
export const updateNoteTitle = (title, noteId) => async dispatch => {
  const response = await csrfFetch(`/api/notes/${noteId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({title})
  });

  if (response.ok) {
    const updatedTitle = await response.json();
    dispatch(updateTitle(updatedTitle));
    return updatedTitle;
  }
}
export const updateNoteContent = (content, noteId) => async dispatch => {
  const response = await csrfFetch(`/api/notes/${noteId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({content})
  });

  if (response.ok) {
    const updatedContent = await response.json();
    dispatch(updateContent(updatedContent));
    return updatedContent;
  }
}

export const deleteOneNote = (noteId) => async dispatch => {
  const response = await csrfFetch(`/api/notes/${noteId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })

  if (response.ok) {
    const note = await response.json();
    dispatch(deleteNote(note));
    return note;
  }
}

const initialState = {
  notes: []
}

const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        notes: action.notes
      };
    }
    case ADD:
      return {
        ...state,
        notes: [...state.notes, action.newNote]
      }
    case UPDATE:
      return {
        ...state,
        notes: [...state.notes, action.updatedNote]
      }
    case UPDATE_TITLE:
      return {
        ...state,
        title: action.title,
      };
    case UPDATE_CONTENT:
      return {
        ...state,
        content: action.content,
      };
    case DELETE:
      const newState = { ...state };
      delete action.noteToDelete;
      return newState;
    default:
      return state;
  }
}

export default notesReducer;