import { types } from "../../Types/types";

describe("Test in types file object to evaluate the actions", () => {
  const typesTest = {
    login: "[Auth] Login",
    logout: "[Auth] LogOut",

    uiSetError: "[UI] setError",
    uiRemoveError: "[UI] removeError",
    uiStartLoading: "[UI] Start loading",
    uiFinishLoading: "[UI] Finish loading",
    uiErrorInFirebase: "[UI] Error inFirebase",
    uiRemoveErrorInFireBase: "[UI] Remove Error inFirebase",

    notesAddNew: "[Notes] New note",
    notesActive: "[Notes] Set active note",
    notesLoad: "[Notes] Load notes",
    notesUpdate: "[Notes] Update note",
    notesOpenModal: "[Notes] Open modal note",
    notesCloseModal: "[Notes] Close modal note",
    notesFileUrl: "[Notes] Updated file url",
    notesDelete: "[Notes] Delete note",
    notesLogOutCleaning: "[Notes] LogOut cleaning",
  };
  it("types object", () => {
    expect(typesTest).toEqual(types);
  });
});
