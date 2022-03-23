import validator from "validator";
import { setErrorAction, unSetErrorAction } from "../../Actions/ui";
const errorsMessage = {
  errorName: "name is required",
  errorEmail: "email is invalid",
  errorPassword: "Password fail, at least the password must be 5 characteres",
  errorPasswordLogin: "The password is required",
};
export const isFormValidRegister = (valuesInputs, dispatch) => {
  const { email, password, name, confirmPassword } = valuesInputs;
  if (name.trim().length === 0) {
    dispatch(setErrorAction(errorsMessage.errorName));
    return false;
  } else if (!validator.isEmail(email)) {
    dispatch(setErrorAction(errorsMessage.errorEmail));
    return false;
  } else if (password !== confirmPassword || password.length < 5) {
    dispatch(setErrorAction(errorsMessage.errorPassword));
    return false;
  }

  dispatch(unSetErrorAction());
  return true;
};
export const isFormValidLogin = (valuesInputs, dispatch) => {
  const { email, password } = valuesInputs;
  if (!validator.isEmail(email)) {
    dispatch(setErrorAction(errorsMessage.errorEmail));
    return false;
  } else if (password.length < 5) {
    dispatch(setErrorAction(errorsMessage.errorPasswordLogin));
    return false;
  }
  dispatch(unSetErrorAction());
  return true;
};
