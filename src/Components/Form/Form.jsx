import { Inputs } from "./Inputs";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getLoginUserAction, registerUserAction } from "../../Actions/auth";
import { isFormValidRegister, isFormValidLogin } from "../Utils/validations";
import { AlertUI } from "../AlertUI";
import { removeErrorInFirebase } from "../../Actions/ui";

export const Form = ({ pageName, page, values, handleInputChange }) => {
  const dispatch = useDispatch();
  const { msgError, loading } = useSelector((state) => state.ui);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(removeErrorInFirebase());
    const { email, password, name } = values;
    if (pageName === "Login" && isFormValidLogin(values, dispatch))
      return dispatch(getLoginUserAction(email, password));
    if (pageName === "Register" && isFormValidRegister(values, dispatch))
      return dispatch(registerUserAction(name, email, password));
  };
  return (
    <form onSubmit={handleSubmit}>
      {msgError && <AlertUI msgError={msgError} />}
      <Inputs
        page={page}
        values={values}
        handleInputChange={handleInputChange}
      />
      <button
        className="btn btn-primary btn-block mb-5"
        type="submit"
        disabled={loading}
      >
        {pageName}
      </button>
    </form>
  );
};

Form.propTypes = {
  pageName: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};
