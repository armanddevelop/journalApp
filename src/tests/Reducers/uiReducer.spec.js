import { uiReducer } from "../../Reducers/uiReducer";
import { types } from "../../Types/types";

describe("Test in uiReducer", () => {
  const initialState = {
    loading: false,
    msgError: null,
    errorMsgFb: {
      error: false,
      msgError: "",
    },
  };

  it("uiRedcuer uiSetError action", () => {
    const action = {
      payload: "hola mundo",
      type: types.uiSetError,
    };
    const responseReducer = uiReducer(initialState, action);
    const { msgError } = responseReducer;
    expect(msgError).not.toBe(null);
  });

  it("uiReducer uiRemoveError action", () => {
    const state = {
      loading: false,
      msgError: true,
      errorMsgFb: {
        error: false,
        msgError: "",
      },
    };
    const action = {
      type: types.uiRemoveError,
    };
    const responseReducer = uiReducer(state, action);

    expect(responseReducer.msgError).toBe(null);
  });

  it("uiReducer uiStartLoading action", () => {
    const action = {
      type: types.uiStartLoading,
    };
    const responseReducer = uiReducer(initialState, action);

    expect(responseReducer.loading).toBe(true);
  });

  it("uiReducer uiFinishLoading action", () => {
    const action = {
      type: types.uiFinishLoading,
    };
    const responseReducer = uiReducer(initialState, action);

    expect(responseReducer.loading).toEqual(initialState.loading);
  });

  it("uiReducer uiErrorInFirebase action", () => {
    const action = {
      type: types.uiErrorInFirebase,
      payload: "Error in fireBase",
    };
    const state = {
      loading: false,
      msgError: true,
      errorMsgFb: {
        error: false,
        msgError: "",
      },
    };
    const responseReducer = uiReducer(state, action);
    const { errorMsgFb } = responseReducer;
    const { error, msgError } = errorMsgFb;

    expect(error).toEqual(true);
    expect(msgError).toEqual(action.payload);
  });

  it("uiReducer uiRemoveErrorInFireBase action", () => {
    const action = {
      type: types.uiRemoveErrorInFireBase,
    };
    const state = {
      loading: false,
      msgError: true,
      errorMsgFb: {
        error: true,
        msgError: "",
      },
    };
    const responseReducer = uiReducer(state, action);
    const { errorMsgFb } = responseReducer;
    const { error, msgError } = errorMsgFb;

    expect(error).toEqual(false);
    expect(msgError).toEqual("");
  });

  it("uiReducer default action", () => {
    const action = {
      type: types.notesActive,
    };
    const state = {
      loading: false,
      msgError: true,
      errorMsgFb: {
        error: true,
        msgError: "",
      },
    };
    const responseReducer = uiReducer(state, action);

    expect(responseReducer).toEqual(state);
  });
});
