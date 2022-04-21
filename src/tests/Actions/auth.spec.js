import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  logInAction,
  logOutAction,
  startLogOut,
  getLoginUserAction,
  registerUserAction,
} from "../../Actions/auth";
import { types } from "../../Types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
let store = mockStore(initState);

describe("Unit test in auth actions file", () => {
  beforeEach(() => {
    store = mockStore(initState);
  });
  it("logInAction should return a login data", () => {
    const uid = "TEST";
    const displayName = "alicha";
    const logInActionResponse = logInAction(uid, displayName);

    expect(logInActionResponse.type).toEqual(types.login);
    expect(logInActionResponse.payload.uid).toEqual(uid);
    expect(logInActionResponse.payload.displayName).toEqual(displayName);
  });

  it("logOutAction should logOut action", () => {
    const logOutActionResponse = logOutAction();

    expect(logOutActionResponse.type).toEqual(types.logout);
  });

  it("startLogOut should logOut data", async () => {
    await store.dispatch(startLogOut());
    const actions = store.getActions();

    expect(actions.length).not.toBe(0);
    expect(actions[0].type).toEqual(types.logout);
    expect(actions[1].type).toEqual(types.notesLogOutCleaning);
  });

  it("getLoginUserAction should login user", async () => {
    await store.dispatch(
      getLoginUserAction("test-react-jornal@testing.com", "123456")
    );

    const actions = store.getActions();

    expect(actions[0].type).toEqual(types.uiStartLoading);
    expect(actions[1].type).toEqual(types.uiRemoveErrorInFireBase);
    expect(actions[2].type).toEqual(types.login);
    expect(actions[3].type).toEqual(types.uiFinishLoading);
    expect(actions[2]).toEqual({
      type: expect.any(String),
      payload: expect.any(Object),
    });
  });

  it("registerUserAction should register new user", async () => {
    await store.dispatch(
      registerUserAction("alicha", "fulanito@testing.com", "654321")
    );
    const actions = store.getActions();

    expect(actions[0].type).toEqual(types.uiStartLoading);
    expect(actions[1].type).toEqual(types.uiRemoveErrorInFireBase);
    expect(actions[2].type).toEqual(types.uiFinishLoading);
    expect(actions[3]).toEqual({
      type: types.uiErrorInFirebase,
      payload: "The email address is already in use by another account.",
    });
  });
});
