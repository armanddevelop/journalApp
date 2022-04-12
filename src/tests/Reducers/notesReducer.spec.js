import { notesReducer } from "../../Reducers/notesReducer";
import { types } from "../../Types/types";

describe("Tests in notesReducer", () => {
  const initialState = {
    notes: [],
    active: null,
    saveNote: { isSave: false, title: "", message: "" },
  };

  it("notesReducer notesAddNew action", () => {
    const action = {
      type: types.notesAddNew,
      payload: {
        name: "alicha",
        body: "ya llego la alicha",
        title: "nota nueva",
        id: 1234556,
      },
    };
    const responseReducer = notesReducer(initialState, action);
    const { notes, active, saveNote } = responseReducer;
    const { isSave, title, message } = saveNote;

    expect(notes.length).toBe(1);
    expect(active).toEqual(null);
    expect(isSave).toEqual(false);
    expect(title).toBe("");
    expect(message).toBe("");
  });

  it("notesReducer notesActive action", () => {
    const action = {
      type: types.notesActive,
      payload: {
        name: "alicha",
        body: "hola mundo",
        title: "nota dos",
        id: 1234556,
      },
    };
    const responseReducer = notesReducer(initialState, action);
    const { active } = responseReducer;

    expect(active).not.toBe(null);
  });

  it("notesReducer notesLoad action", () => {
    const action = {
      type: types.notesLoad,
      payload: [
        {
          name: "alicha",
          body: "hola mundo",
          title: "nota dos",
          id: 1234556,
        },
      ],
    };
    const responseReducer = notesReducer(initialState, action);
    const { notes } = responseReducer;

    expect(notes.length).toBe(1);
  });

  it("notesReducer notesUpdate action", () => {
    const action = {
      type: types.notesUpdate,
      payload: [
        {
          name: "alicha",
          body: "hola mundo",
          title: "nota dos",
          id: 1234556,
        },
      ],
    };
    const responseReducer = notesReducer(initialState, action);

    expect(responseReducer).toEqual({});
  });

  it("notesReducer notesOpenModal action action.payload.strMsg different Error to save note", () => {
    const action = {
      type: types.notesOpenModal,
      payload: {
        strMsg: "save",
        strTitle: "nota guardada",
      },
    };
    const responseReducer = notesReducer(initialState, action);
    const { saveNote } = responseReducer;
    const { isSave, message, title } = saveNote;

    expect(isSave).toBe(true);
    expect(message).toBe(action.payload.strMsg);
    expect(title).toBe(action.payload.strTitle);
  });

  it("notesReducer notesOpenModal action action.payload.strMsg equals Error to save note", () => {
    const action = {
      type: types.notesOpenModal,
      payload: {
        strMsg: "Error to save note",
        strTitle: "nota guardada",
      },
    };
    const responseReducer = notesReducer(initialState, action);
    const { saveNote } = responseReducer;
    const { isSave, message, title } = saveNote;

    expect(isSave).toBe(false);
    expect(message).toBe(action.payload.strMsg);
    expect(title).toBe(action.payload.strTitle);
  });

  it("notesReducer notesCloseModal action", () => {
    const action = {
      type: types.notesCloseModal,
    };
    const responseReducer = notesReducer(initialState, action);
    const { saveNote } = responseReducer;
    const { isSave } = saveNote;

    expect(isSave).toEqual(false);
  });

  it("notesReducer notesDelete action", () => {
    const state = {
      notes: [
        {
          name: "alicha",
          body: "ya llego la alicha",
          title: "nota nueva",
          id: 1234556,
        },
        {
          name: "alicha",
          body: "ya llego la alicha",
          title: "nota",
          id: 123456,
        },
      ],
      active: true,
      saveNote: { isSave: false, title: "", message: "" },
    };
    const action = {
      payload: 1234556,
      type: types.notesDelete,
    };
    const responseReducer = notesReducer(state, action);
    const { notes, active } = responseReducer;

    expect(notes.length).not.toEqual(state.notes.length);
    expect(active).toEqual(null);
  });

  it("notesReducer notesLogOutCleaning action", () => {
    const action = {
      type: types.notesLogOutCleaning,
    };
    const state = {
      notes: [
        {
          name: "alicha",
          body: "ya llego la alicha",
          title: "nota nueva",
          id: 1234556,
        },
        {
          name: "alicha",
          body: "ya llego la alicha",
          title: "nota",
          id: 123456,
        },
      ],
      active: true,
      saveNote: { isSave: false, title: "", message: "" },
    };
    const responseReducer = notesReducer(state, action);

    expect(responseReducer).toEqual(initialState);
  });

  it("notesReducer default action", () => {
    const action = {
      type: types.uiErrorInFirebase,
    };

    const responseReducer = notesReducer(initialState, action);

    expect(responseReducer).toEqual(initialState);
  });
});
