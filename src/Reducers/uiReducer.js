import { types } from "../Types/types";

const initialState = {
  loading: false,
  msgError: null,
  errorMsgFb: {
    error: false,
    msgError: "",
  },
};
export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiSetError:
      return {
        ...state,
        msgError: action.payload,
      };
    case types.uiRemoveError:
      return {
        ...state,
        msgError: null,
      };
    case types.uiStartLoading:
      return {
        ...state,
        loading: true,
      };
    case types.uiFinishLoading:
      return {
        ...state,
        loading: false,
      };
    case types.uiErrorInFirebase:
      return {
        ...state,
        errorMsgFb: {
          error: true,
          msgError: action.payload,
        },
      };
    case types.uiRemoveErrorInFireBase:
      return {
        ...state,
        errorMsgFb: {
          error: false,
          msgError: "",
        },
      };
    default:
      return state;
  }
};
