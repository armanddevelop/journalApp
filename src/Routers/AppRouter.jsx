import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { JornalScreen } from "../Components";
import { AuthRouter } from "./AuthRouter";
import { firebase } from "../FireBase/fireBaseConfig";
import { logInAction } from "../Actions/auth";
import { Loading } from "../Components/Loading";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { starLoadingNotesAction } from "../Actions/notes";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.auth);
  const [checking, setChecking] = useState(true);
  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(logInAction(user.uid, user.displayName));
        //dispatch(starLoadingNotesAction(user.uid));
        setIsLogIn(true);
      } else {
        setIsLogIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLogIn]);

  useEffect(() => {
    if (uid) {
      firebase.auth().onAuthStateChanged(() => {
        dispatch(starLoadingNotesAction(uid));
      });
    }
  }, [dispatch, uid]);

  if (checking) {
    return <Loading />;
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route
            path="/auth"
            children={
              <PublicRoutes isLogIn={isLogIn}>
                <AuthRouter />
              </PublicRoutes>
            }
          />
          <Route
            exact
            path="/"
            children={
              <PrivateRoutes isLogIn={isLogIn}>
                <JornalScreen />
              </PrivateRoutes>
            }
          />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
