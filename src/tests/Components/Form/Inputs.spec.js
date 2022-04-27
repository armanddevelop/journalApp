import { mount } from "enzyme";
import { Inputs } from "../../../Components/Form/Inputs";

describe("Test in Inputs component", () => {
  const page = "login";
  const values = {
    email: "prueba@test.com",
    password: "123466",
    name: "alicha",
    confirmPassword: "123466",
  };
  const handleInputChange = jest.fn();
  const wrapper = mount(
    <Inputs page={page} values={values} handleInputChange={handleInputChange} />
  );

  it("Snapshot in Inputs component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should only show 2 inputs by mount login inputs", () => {
    const inputs = wrapper.find("input").length;

    expect(inputs).toBe(2);
  });

  it("Should have the input email and password the same vale as prop values", () => {
    const emailField = wrapper.find("input[name='email']").props();
    const passwordField = wrapper.find("input[name='password']").props();

    expect(passwordField.value).toEqual(values.password);
    expect(emailField.value).toEqual(values.email);
  });

  it("Should not exist name field and confirmPassword field", () => {
    const nameField = wrapper.find("input[name='name']");
    const confirmPassword = wrapper.find("input[name='confirmPassword']");

    expect(nameField.exists()).toEqual(false);
    expect(confirmPassword.exists()).toEqual(false);
  });

  it("Should fire the onChange function in email field", () => {
    const emailField = wrapper.find("input[name='email']");

    emailField.simulate("change");

    expect(handleInputChange).toHaveBeenCalled();
  });

  it("Should fire the onChange function in password field", () => {
    const emailField = wrapper.find("input[name='password']");

    emailField.simulate("change");

    expect(handleInputChange).toHaveBeenCalled();
  });

  it("SnapShot with the register field form", () => {
    const wrapper = mount(
      <Inputs
        page="register"
        values={values}
        handleInputChange={handleInputChange}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("should exist name, email, password, confirm password field", () => {
    const wrapper = mount(
      <Inputs
        page="register"
        values={values}
        handleInputChange={handleInputChange}
      />
    );
    const nameField = wrapper.find("input[name='name']");
    const emailField = wrapper.find("input[name='email']");
    const passwordField = wrapper.find("input[name='password']");
    const confirmPasswordField = wrapper.find("input[name='confirmPassword']");

    expect(nameField.exists()).toBe(true);
    expect(emailField.exists()).toBe(true);
    expect(passwordField.exists()).toBe(true);
    expect(confirmPasswordField.exists()).toBe(true);
  });
});
