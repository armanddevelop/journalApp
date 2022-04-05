import { db } from "../FireBase/fireBaseConfig";
import { types } from "../Types/types";
import { loadNotes } from "../Helpers/loadNotes";
import { fileUpload } from "../Helpers/fileUpload";
import { finishLoading, startLoading } from "./ui";

export const notesActiveAction = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const notesOpenModalAction = (strMsg, strTitle) => ({
  type: types.notesOpenModal,
  payload: {
    strMsg,
    strTitle,
  },
});

export const notesCloseModalAction = () => ({
  type: types.notesCloseModal,
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
    try {
      const notes = await loadNotes(uid);
      dispatch(loadNotesAction(notes));
    } catch (error) {
      console.log("Shit happend in starLoadingNotesAction", error);
    }
  };
};

export const refreshNoteChange = (noteUpdate) => {
  return (dispatch, getState) => {
    const { active, notes } = getState().notes;
    const { title, body } = active;
    const newNotes = notes.map((note) => {
      if (note.idNote === noteUpdate.id) {
        note.title = title;
        note.body = body;
        note.url = noteUpdate.url;
      }
      return note;
    });
    dispatch(loadNotesAction(newNotes));
  };
};

export const startSaveNoteAction = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!note.url) delete note.url;
    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
    try {
      await db.doc(`${uid}/jornal/notes/${note.id}`).update(noteToFirestore);
      //dispatch(starLoadingNotesAction(uid));
      dispatch(finishLoading());
      dispatch(refreshNoteChange(note));
      dispatch(notesOpenModalAction("saved", note.title));
    } catch (error) {
      console.log("shit happend in startSaveNoteAction", error);
      const message = "Error to save note";
      dispatch(finishLoading());
      dispatch(notesOpenModalAction(message, note.title));
    }
  };
};

export const startUploadImageAction = (image) => {
  return async (dispatch, getState) => {
    dispatch(startLoading());
    const { active: activeNote } = getState().notes;
    try {
      const urlImage = await fileUpload(image);
      const activeNoteUrl = {
        ...activeNote,
        url: urlImage,
      };
      dispatch(startSaveNoteAction(activeNoteUrl));
    } catch (error) {
      dispatch(finishLoading());
      console.log("shit happend in startUploadImageAction ", error);
    }
  };
};
