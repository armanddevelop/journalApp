import {
  setErrorAction,
  unSetErrorAction,
  startLoading,
  finishLoading,
  errorInFirebase,
  removeErrorInFirebase,
} from "../../Actions/ui";
import { types } from "../../Types/types";

describe("Test in ui-actions", () => {
  it("All the actions should be created", () => {
    const error = "shit happens";
    const setError = setErrorAction(error);
    const unSetError = unSetErrorAction();
    const startLoad = startLoading();
    const finishLoad = finishLoading();
    const errorFireBase = errorInFirebase(error);
    const removeErrorFirebase = removeErrorInFirebase();

    expect(setError.type).toEqual(types.uiSetError);
    expect(setError.payload).toEqual(error);
    expect(unSetError.type).toEqual(types.uiRemoveError);
    expect(startLoad.type).toEqual(types.uiStartLoading);
    expect(finishLoad.type).toEqual(types.uiFinishLoading);
    expect(errorFireBase.type).toEqual(types.uiErrorInFirebase);
    expect(errorFireBase.payload).toEqual(error);
    expect(removeErrorFirebase.type).toEqual(types.uiRemoveErrorInFireBase);
  });
});
