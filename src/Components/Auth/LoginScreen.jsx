import { Link, useLocation } from "react-router-dom";
import { Form } from "../Form/Form";
import { Google } from "../Social/Google";
import { identifierPage } from "../Utils/identifierPage";

export const LoginScreen = () => {
  const pageName = "Login";
  const location = useLocation();
  const page = identifierPage(location, pageName);
  return (
    <>
      <h3 className="auth__title">{pageName}</h3>
      <Form pageName={pageName} page={page} />
      <Google />
      <Link className="link" to="/auth/register">
        Create new account
      </Link>
    </>
  );
};
