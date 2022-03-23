import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { JornalScreen } from "../Components";
import { AuthRouter } from "./AuthRouter";
import { firebase } from "../FireBase/fireBaseConfig";
import { logInAction } from "../Actions/auth";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLogIn, setIsLogIn] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(logInAction(user.uid, user.displayName));
        setIsLogIn(true);
      } else {
        setIsLogIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLogIn]);
  if (checking) {
    return <h1>Espere ...</h1>;
  }
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/auth" component={AuthRouter} />
          <Route exact path="/" component={JornalScreen} />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
