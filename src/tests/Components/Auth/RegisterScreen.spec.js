import { mount } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { RegisterScreen } from "../../../Components/Auth/RegisterScreen";
import { removeErrorInFirebase, unSetErrorAction } from "../../../Actions/ui";

const mockLocation = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => mockLocation,
}));

jest.mock("../../../Components/Utils/identifierPage", () => ({
  identifierPage: () => "Register",
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
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
);

describe("Test in RegisterScreen component", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  it("Should mount rigth the component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should fireAction in  already register button", () => {
    wrapper.find(".link").first().prop("onClick")();

    expect(removeErrorInFirebase).toHaveBeenCalled();
    expect(unSetErrorAction).toHaveBeenCalled();
  });

  it("Should show register title", () => {
    const title = wrapper.find(".auth__title").text();

    expect(title).toEqual("Register");
  });

  it("Should show AlertUI component", () => {
    const initState = {
      auth: {},
      ui: {
        errorMsgFb: {
          error: true,
          msgError: "Shit happend in Register Screen",
        },
      },
    };
    let store = mockStore(initState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
