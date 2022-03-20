import { Link, useLocation } from "react-router-dom";
import { Form } from "../Form/Form";
import { identifierPage } from "../Utils/identifierPage";

export const RegisterScreen = () => {
  const pageName = "Register";
  const location = useLocation();
  const page = identifierPage(location, pageName);
  return (
    <div>
      <h3 className="auth__title">{pageName}</h3>
      <Form pageName={pageName} page={page} />
      <Link className="link" to="/auth/login">
        Already Register?
      </Link>
    </div>
  );
};
