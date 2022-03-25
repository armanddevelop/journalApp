import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "../../Hooks/useForm";
import { Form } from "../Form/Form";
import { Google } from "../Social/Google";
import { identifierPage } from "../Utils/identifierPage";
import { AlertUI } from "../AlertUI";
import { removeErrorInFirebase, unSetErrorAction } from "../../Actions/ui";

const initialState = {
  email: "alicha@test.com",
  password: "123456",
};
export const LoginScreen = () => {
  const pageName = "Login";
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
    <>
      <h3 className="auth__title">{pageName}</h3>
      {error && <AlertUI msgError={msgError} />}
      <Form
        pageName={pageName}
        page={page}
        values={values}
        handleInputChange={handleInputChange}
      />
      <Google />
      <Link className="link" to="/auth/register" onClick={handleClick}>
        Create new account
      </Link>
    </>
  );
};
