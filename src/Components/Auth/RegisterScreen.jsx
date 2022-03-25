import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { removeErrorInFirebase, unSetErrorAction } from "../../Actions/ui";
import { useForm } from "../../Hooks/useForm";
import { AlertUI } from "../AlertUI";
import { Form } from "../Form/Form";
import { identifierPage } from "../Utils/identifierPage";

const initialState = {
  name: "alicha",
  email: "alicha@test.com",
  password: "123456",
  confirmPassword: "123456",
};

export const RegisterScreen = () => {
  const pageName = "Register";
  const location = useLocation();
  const dispatch = useDispatch();
  const page = identifierPage(location, pageName);
  const { values, handleInputChange } = useForm(initialState);
  const { error, msgError } = useSelector((state) => state.ui.errorMsgFb);
  const handleClick = () => {
    dispatch(removeErrorInFirebase());
    dispatch(unSetErrorAction());
  };
  return (
    <div>
      <h3 className="auth__title">{pageName}</h3>
      {error && <AlertUI msgError={msgError} />}
      <Form
        pageName={pageName}
        page={page}
        values={values}
        handleInputChange={handleInputChange}
      />
      <Link className="link" to="/auth/login" onClick={handleClick}>
        Already Register?
      </Link>
    </div>
  );
};
