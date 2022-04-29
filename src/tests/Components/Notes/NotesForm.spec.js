import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  startDeleteNoteAction,
  notesActiveAction,
} from "../../../Actions/notes";
import { NotesForm } from "../../../Components/Notes/NotesForm";

jest.mock("../../../Actions/notes", () => ({
  startDeleteNoteAction: jest.fn(),
  notesActiveAction: jest.fn(),
}));
const initState = {
  auth: {
    name: "Alicha",
  },
  ui: {
    errorMsgFb: {
      error: false,
      msgError: "",
    },
  },
  notes: {
    active: {
      id: "safdbdg32435",
      title: "Hi note",
      body: "hi lich",
      date: 1649197509169,
    },
    notes: [],
    saveNote: {
      isSave: true,
      message: "All rigth",
      title: "note save",
    },
  },
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store = mockStore(initState);
store.dispatch = jest.fn();

describe("Test in NotesForm Component", () => {
  const wrapper = mount(
    <Provider store={store}>
      <NotesForm />
    </Provider>
  );

  it("SnapShot to NotesForm component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should execute startDeleteNoteAction", () => {
    wrapper.find(".notes__title-input").simulate("change", {
      target: {
        name: "title",
        value: "Bye note",
      },
    });
    const { notes } = initState;

    expect(notesActiveAction).toHaveBeenCalledWith(notes.active.id, {
      body: "hi lich",
      date: 1649197509169,
      title: "Bye note",
      url: undefined,
    });
  });

  it("Should excute startDeleteNoteAction", () => {
    wrapper.find(".btn").prop("onClick")();
    const { notes } = initState;

    expect(startDeleteNoteAction).toHaveBeenCalledWith(notes.active.id);
  });

  it("Should not exist url img div", () => {
    expect(wrapper.find(".notes__image").exists()).toBe(false);
  });

  it("Should exist url img div", () => {
    const initState = {
      auth: {
        name: "Alicha",
      },
      ui: {
        errorMsgFb: {
          error: false,
          msgError: "",
        },
      },
      notes: {
        active: {
          id: "safdbdg32435",
          title: "Hi note",
          body: "hi lich",
          date: 1649197509169,
          url: "https//:www.img.com",
        },
        notes: [],
        saveNote: {
          isSave: true,
          message: "All rigth",
          title: "note save",
        },
      },
    };
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    let store = mockStore(initState);
    store.dispatch = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <NotesForm />
      </Provider>
    );
    expect(wrapper.find(".notes__image").exists()).toBe(true);
  });
});
