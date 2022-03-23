import { Link, useLocation } from "react-router-dom";
import { useForm } from "../../Hooks/useForm";
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
  const page = identifierPage(location, pageName);
  const { values, handleInputChange } = useForm(initialState);
  return (
    <div>
      <h3 className="auth__title">{pageName}</h3>
      <Form
        pageName={pageName}
        page={page}
        values={values}
        handleInputChange={handleInputChange}
      />
      <Link className="link" to="/auth/login">
        Already Register?
      </Link>
    </div>
  );
};
