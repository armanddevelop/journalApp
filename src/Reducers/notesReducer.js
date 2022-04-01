import { types } from "../Types/types";

/*
{
  notes:[],
  active:null,
  active:{
    id:"safdbdg32435"
    title:string
    body:string
    imageUrl:string
    date:1315131
  }
}
*/

const initialState = {
  notes: [],
  active: null,
  saveNote: { isSave: false, title: "", message: "" },
};
export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesActive:
      return {
        ...state,
        active: { ...action.payload },
      };
    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload],
      };
    case types.notesOpenModal:
      if (action.payload.strMsg !== "Error to save note") {
        return {
          ...state,
          saveNote: {
            isSave: true,
            message: action.payload.strMsg,
            title: action.payload.strTitle,
          },
        };
      }
      return {
        ...state,
        saveNote: {
          isSave: false,
          message: action.payload.strMsg,
          title: action.payload.strTitle,
        },
      };
    case types.notesCloseModal:
      return {
        ...state,
        saveNote: {
          isSave: false,
          message: "",
          title: "",
        },
      };
    default:
      return state;
  }
};
