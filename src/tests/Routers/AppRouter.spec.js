import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { AppRouter } from "../../Routers/AppRouter";
import { act } from "react-dom/test-utils";
import { firebase } from "../../FireBase/fireBaseConfig";
import { logInAction } from "../../Actions/auth";

jest.mock("../../Actions/auth", () => ({
  logInAction: jest.fn(),
}));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {},
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
let store = mockStore(initState);
store.dispatch = jest.fn();

describe("Test in AppRouter component", () => {
  it("Should log if the user are authenticate", async () => {
    let user;
    await act(async () => {
      const userCredentials = await firebase
        .auth()
        .signInWithEmailAndPassword("test-react-jornal@testing.com", "123456");

      user = userCredentials.user;
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(logInAction).toHaveBeenCalledWith(
      "71zJGpVXJ0TKEyhFoWThL1uoHJj1",
      null
    );
  });
});
