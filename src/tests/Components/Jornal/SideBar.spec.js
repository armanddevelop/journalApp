import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startLogOut } from "../../../Actions/auth";
import { startNewNoteAction } from "../../../Actions/notes";
import { SideBar } from "../../../Components/Jornal/SideBar";

jest.mock("../../../Actions/auth", () => ({
  startLogOut: jest.fn(),
}));
jest.mock("../../../Actions/notes", () => ({
  startNewNoteAction: jest.fn(),
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
    <SideBar />
  </Provider>
);
describe("Test in SideBar component", () => {
  it("SnapShot to SideBar component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should show the right name in the component", () => {
    const name = wrapper.find("span").text();
    const { auth } = store.getState((state) => state);

    expect(name.trim()).toBe(auth.name);
  });

  it("Should execute handleLogOut", () => {
    wrapper.find(".btn").prop("onClick")();

    expect(startLogOut).toBeCalled();
  });

  it("Should execute startNewNoteAction", () => {
    wrapper.find(".jornal__new-entry").prop("onClick")();

    expect(startNewNoteAction).toHaveBeenCalled();
  });
});
