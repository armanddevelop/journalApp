import { types } from "../Types/types";
import { firebase, googleAuthProvider } from "../FireBase/fireBaseConfig";
import { finishLoading, startLoading } from "./ui";

export const logInAction = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const getGoogleLogInAction = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        const { uid, displayName } = user;
        dispatch(logInAction(uid, displayName));
      });
  };
};

export const getLoginUserAction = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const { uid, displayName } = user;
        dispatch(logInAction(uid, displayName));
        dispatch(finishLoading());
      })
      .catch((error) => {
        console.log("Error happed in getLoginUserAction ", error);
        dispatch(finishLoading());
      });
  };
};
export const registerUserAction = (name, email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        const { uid, displayName } = user;
        dispatch(logInAction(uid, displayName));
        dispatch(finishLoading());
      })
      .catch((error) => {
        console.log("error ocurred in resgisterUser ", error);
        dispatch(finishLoading());
      });
  };
};
