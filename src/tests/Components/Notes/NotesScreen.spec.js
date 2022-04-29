import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { NoteScreen } from "../../../Components/Notes/NoteScreen";

const initState = {
  auth: {
    name: "Alicha",
  },
  ui: {
    errorMsgFb: {
      error: false,
      msgError: "",
    },
    loading: false,
  },
  notes: {
    active: {
      id: "safdbdg32435",
    },
    note: {},
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

describe("Test in NotesScreen component", () => {
  const wrapper = mount(
    <Provider store={store}>
      <NoteScreen />
    </Provider>
  );

  it("SnapShot to NotesScreen component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should render NotesForm component", () => {
    expect(wrapper.find(".notes__content").exists()).toEqual(true);
    expect(wrapper.find(".loading").exists()).toEqual(false);
  });

  it("Should render loading component", () => {
    const initState = {
      auth: {
        name: "Alicha",
      },
      ui: {
        errorMsgFb: {
          error: false,
          msgError: "",
        },
        loading: true,
      },
      notes: {
        active: {
          id: "safdbdg32435",
        },
        note: {},
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
    const wrapper = mount(
      <Provider store={store}>
        <NoteScreen />
      </Provider>
    );

    expect(wrapper.find(".notes__content").exists()).toEqual(false);
    expect(wrapper.find(".loading").exists()).toEqual(true);
  });
});
