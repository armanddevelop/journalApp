/**
 * @jest-environment node
 */
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startNewNoteAction,
  notesActiveAction,
  starLoadingNotesAction,
  startSaveNoteAction,
} from "../../Actions/notes";
import { db } from "../../FireBase/fireBaseConfig";
import { types } from "../../Types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {
    uid: "TESTING",
  },
  notes: {
    active: {
      title: "",
      body: "",
    },
    notes: [],
  },
};
let store = mockStore(initState);

describe("Test on notes actions", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });

  it("startNewNoteAction", async () => {
    await store.dispatch(startNewNoteAction());
    const actions = store.getActions();
    const notesActiveObject = {
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    };
    const notesAddNewObject = {
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        title: "",
        body: "",
        date: expect.any(Number),
      },
    };

    expect(actions[0]).toEqual(notesActiveObject);
    expect(actions[1]).toEqual(notesAddNewObject);

    //delete the record in fireBase
    const { payload } = actions[0];
    const { id } = payload;
    const { auth } = store.getState((state) => state);
    await db.doc(`${auth.uid}/jornal/notes/${id}`).delete();
  });

  it("notesActiveAction test", () => {
    const id = 123456;
    const note = {
      title: "titulo",
      body: "esto es una nota",
      date: 1649798985378,
    };
    const responseAction = notesActiveAction(id, note);
    const { type, payload } = responseAction;

    expect(type).toEqual(types.notesActive);
    note.id = id;
    expect(payload).toEqual(note);
  });

  it("starLoadingNotesAction should load the notes", async () => {
    const { auth } = store.getState((state) => state);
    await store.dispatch(starLoadingNotesAction(auth.uid));
    const actions = store.getActions();
    const expectedObject = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };

    expect(actions[0].length).not.toBe(0);
    expect(actions[0].type).toBe(types.notesLoad);
    expect(actions[0].payload[0]).toMatchObject(expectedObject);
  });

  it("startSaveNoteAction should save a note", async () => {
    const note = {
      id: "Cjx6qYhnGuCQ4IeoUwJX",
      title: "hola creting",
      body: "esta es una nota actualizada",
      date: 1649798707452,
    };
    await store.dispatch(startSaveNoteAction(note));
    const actions = store.getActions();

    expect(actions[2].type).toEqual(types.notesOpenModal);
    expect(actions[2].payload.strMsg).toEqual("saved");
    expect(actions[2].payload.strTitle).toEqual(note.title);
  });
});
