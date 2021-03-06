import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { getGoogleLogInAction } from "../../../Actions/auth";
import { removeErrorInFirebase, unSetErrorAction } from "../../../Actions/ui";
import { LoginScreen } from "../../../Components/Auth/LoginScreen";

const mockLocation = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => mockLocation,
}));

jest.mock("../../../Components/Utils/identifierPage", () => ({
  identifierPage: () => "page name",
}));

jest.mock("../../../Actions/auth", () => ({
  getGoogleLogInAction: jest.fn(),
}));

jest.mock("../../../Actions/ui", () => ({
  removeErrorInFirebase: jest.fn(),
  unSetErrorAction: jest.fn(),
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
};
let store = mockStore(initState);
store.dispatch = jest.fn();
const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
);
describe("Test in LoginScreen component", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  it("snapShot to LoginScreen component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should show register title", () => {
    const title = wrapper.find(".auth__title").text();

    expect(title).toEqual("Login");
  });

  it("Login with google should fire the google login", () => {
    wrapper.find(".google-btn").prop("onClick")();

    expect(getGoogleLogInAction).toHaveBeenCalled();
  });

  it("removeErrorInFirebase and unSetErrorAction should been called", () => {
    wrapper.find(".link").first().prop("onClick")();

    expect(removeErrorInFirebase).toHaveBeenCalled();
    expect(unSetErrorAction).toHaveBeenCalled();
  });

  it("Should show AlertUI component", () => {
    const initState = {
      auth: {},
      ui: {
        errorMsgFb: {
          error: true,
          msgError: "Shit happend in test",
        },
      },
    };
    let store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <LoginScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
