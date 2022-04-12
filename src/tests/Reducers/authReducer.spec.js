import { authReducer } from "../../Reducers/authReducer";
import { types } from "../../Types/types";

describe("Test in authReducer", () => {
  const initialState = {};

  it("authReducer login action", () => {
    const action = {
      payload: {
        uid: 1234,
        displayName: "yalitza",
      },
      type: types.login,
    };
    const responseReducer = authReducer(initialState, action);

    expect(typeof responseReducer).toEqual(typeof action.payload);
  });

  it("authReducer logout action", () => {
    const action = {
      payload: {
        uid: 1234,
        displayName: "yalitza",
      },
      type: types.logout,
    };
    const responseReducer = authReducer(initialState, action);

    expect(responseReducer).toEqual(initialState);
  });

  it("authReducer tes the default case", () => {
    const action = {
      payload: {
        uid: 1234,
        displayName: "chicha",
      },
      type: types.notesActive,
    };
    const responseReducer = authReducer(action.payload, action);

    expect(responseReducer).toEqual(action.payload);
  });
});
