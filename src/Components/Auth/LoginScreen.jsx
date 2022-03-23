import { Link, useLocation } from "react-router-dom";
import { useForm } from "../../Hooks/useForm";
import { Form } from "../Form/Form";
import { Google } from "../Social/Google";
import { identifierPage } from "../Utils/identifierPage";

const initialState = {
  email: "alicha@test.com",
  password: "123456",
};
export const LoginScreen = () => {
  const pageName = "Login";
  const location = useLocation();
  const page = identifierPage(location, pageName);
  const { values, handleInputChange } = useForm(initialState);
  return (
    <>
      <h3 className="auth__title">{pageName}</h3>
      <Form
        pageName={pageName}
        page={page}
        values={values}
        handleInputChange={handleInputChange}
      />
      <Google />
      <Link className="link" to="/auth/register">
        Create new account
      </Link>
    </>
  );
};
