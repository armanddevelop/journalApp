import { types } from "../Types/types";
import { firebase, googleAuthProvider } from "../FireBase/fireBaseConfig";
import {
  finishLoading,
  startLoading,
  errorInFirebase,
  removeErrorInFirebase,
} from "./ui";
import { notesLogOutAction } from "./notes";

export const logInAction = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const logOutAction = () => ({
  type: types.logout,
});

export const startLogOut = () => {
  return async (dispatch) => {
    try {
      await firebase.auth().signOut();
      dispatch(logOutAction());
      dispatch(notesLogOutAction());
    } catch (error) {
      console.log("shit happen in startLogOut ", error);
    }
  };
};

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
    dispatch(removeErrorInFirebase());
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const { uid, displayName } = user;
        dispatch(logInAction(uid, displayName));
        dispatch(finishLoading());
      })
      .catch((error) => {
        dispatch(finishLoading());
        dispatch(errorInFirebase(error.message));
      });
  };
};

export const registerUserAction = (name, email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    dispatch(removeErrorInFirebase());
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
        dispatch(finishLoading());
        dispatch(errorInFirebase(error.message));
      });
  };
};
