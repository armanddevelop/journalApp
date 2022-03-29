import { db } from "../FireBase/fireBaseConfig";
import { types } from "../Types/types";
import { loadNotes } from "../Helpers/loadNotes";
export const notesActiveAction = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const startNewNoteAction = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };
    const docRef = await db.collection(`${uid}/jornal/notes`).add(newNote);
    dispatch(notesActiveAction(docRef.id, newNote));
  };
};

export const loadNotesAction = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

export const starLoadingNotesAction = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(loadNotesAction(notes));
  };
};
