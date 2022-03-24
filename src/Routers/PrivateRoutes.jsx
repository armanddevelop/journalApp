import { Redirect } from "react-router-dom";

export const PrivateRoutes = ({ children, isLogIn }) =>
  isLogIn ? children : <Redirect to="/auth/login" />;
