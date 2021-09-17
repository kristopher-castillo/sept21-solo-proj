import { csrfFetch } from "./csrf";

const LOAD = "notebooks/LOAD";
const ADD = "notebooks/ADD_NOTEBOOK";
const DELETE = "notebooks/DELETE_NOTEBOOK";
const UPDATE = "notebooks/UPDATE";
const UPDATE_TITLE = "notebooks/UPDATE_TITLE";

const load = (notebooks) => ({
  type: LOAD,
  notebooks
});

const addNotebook = (newNotebook) => ({
  type: ADD,
  newNotebook
});

const update = (notebooks) => ({
  type: UPDATE,
  notebooks
});
const updateTitle = (title) => ({
  type: UPDATE_TITLE,
  title
});

const deleteNotebook = (notebookToDelete) => ({
  type: DELETE,
  notebookToDelete
});

export const getNotebooks = () => async (dispatch) => {
  const response = await csrfFetch("/api/notebooks");

  if (response.ok) {
    const notebooks = await response.json();
    dispatch(load(notebooks));
  }
};

export const createNewNotebook = (notebookData) => async (dispatch) => {
  const response = await csrfFetch("/api/notebooks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notebookData),
  });

  if (response.ok) {
    const newNotebook = await response.json();

    dispatch(addNotebook(newNotebook));
    return newNotebook;
  }
};

export const updateOneNotebook = (notebook) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebooks/${notebook.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notebook),
  });

  if (response.ok) {
    const updatedNotebook = await response.json();
    dispatch(update(updatedNotebook));
    return updatedNotebook;
  }
};
export const updateNotebookTitle = (title, notebookId) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebooks/${notebookId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  if (response.ok) {
    const updatedTitle = await response.json();
    dispatch(updateTitle(updatedTitle));
    return updatedTitle;
  }
};

export const deleteOneNotebook = (notebookId) => async (dispatch) => {
  const response = await csrfFetch(`/api/notebooks/${notebookId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    const notebook = await response.json();
    dispatch(deleteNotebook(notebook));
    return notebook;
  }
};

const initialState = {
  notebooks: [],
};

const notebooksReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        notebooks: action.notebooks
      };
    }
    case ADD:
      return {
        ...state,
        notebooks: [...state.notebooks, action.newNotebook],
      };
    case UPDATE:
      return {
        ...state,
        notebooks: [...state.notebooks, action.updatedNotebook],
      };
    case UPDATE_TITLE:
      return {
        ...state,
        title: action.title,
      };

    case DELETE:
      const newState = { ...state };
      delete action.notebookToDelete;
      return newState;
    default:
      return state;
  }
};

export default notebooksReducer;