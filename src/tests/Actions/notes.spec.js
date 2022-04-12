import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startNewNoteAction } from "../../Actions/notes";
import { db } from "../../FireBase/fireBaseConfig";
import { types } from "../../Types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
  auth: {
    uid: "TESTING",
  },
});

describe("Test on notes actions", () => {
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
});
