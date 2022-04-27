import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { getLoginUserAction, registerUserAction } from "../../../Actions/auth";
import { Form } from "../../../Components/Form/Form";

jest.mock("../../../Actions/auth", () => ({
  getLoginUserAction: jest.fn(),
  registerUserAction: jest.fn(),
}));
jest.mock("../../../Components/Utils/validations", () => ({
  isFormValidRegister: () => true,
  isFormValidLogin: () => true,
}));
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  auth: {},
  ui: {
    msgError: "",
    loading: false,
  },
};
let store = mockStore(initState);
store.dispatch = jest.fn();
const values = {
  email: "test@hotmail.com",
  password: "als811",
  name: "alicha",
};
describe("Test in Form component login form", () => {
  const wrapper = mount(
    <Provider store={store}>
      <Form
        pageName="Login"
        page="login"
        values={values}
        handleInputChange={() => {}}
      />
    </Provider>
  );

  it("SnapShot to Form component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("Should mount login form", () => {
    const content = wrapper.find("button").text();

    expect(content).toEqual("Login");
  });

  it("Should show only two inputs", () => {
    const inputs = wrapper.find("input").length;

    expect(inputs).toEqual(2);
  });

  it("should execute getLoginUserAction", () => {
    wrapper.find("form").simulate("submit", { preventDefault: () => {} });

    expect(getLoginUserAction).toHaveBeenCalledWith(
      values.email,
      values.password
    );
  });

  describe("Test in Form component register form", () => {
    const wrapper = mount(
      <Provider store={store}>
        <Form
          pageName="Register"
          page="register"
          values={values}
          handleInputChange={() => {}}
        />
      </Provider>
    );

    it("To match Snapshot register", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("Should show the inputs in register", () => {
      const inputs = wrapper.find("input").length;

      expect(inputs).toEqual(4);
    });

    it("should execute registerUserAction", () => {
      wrapper.find("form").simulate("submit", { preventDefault: () => {} });

      expect(registerUserAction).toHaveBeenCalledWith(
        values.name,
        values.email,
        values.password
      );
    });
  });
  describe("Snapshot with the AlertUI component", () => {
    const initState = {
      auth: {},
      ui: {
        msgError: "shit happend in Form",
        loading: true,
      },
    };
    let store = mockStore(initState);
    const wrapper = mount(
      <Provider store={store}>
        <Form
          pageName="Register"
          page="register"
          values={values}
          handleInputChange={() => {}}
        />
      </Provider>
    );

    it("Should show AlertUI componentn in snapshot", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("Should have alerts__container in AlertUI component", () => {
      const propertie = wrapper.find(".alerts__container").exists();

      expect(propertie).toEqual(true);
    });

    it("Should have the error message in AlertUI component", () => {
      const msgError = wrapper.find(".MuiAlert-message").first().text();

      expect(msgError).toEqual(initState.ui.msgError);
    });
  });
});
