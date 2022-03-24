import { Redirect } from "react-router-dom";

export const PublicRoutes = ({ children, isLogIn }) =>
  !isLogIn ? children : <Redirect to="/" />;
