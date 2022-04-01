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

const initialState = { notes: [], active: null, saveNote: false };
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
      return {
        ...state,
        saveNote: true,
      };
    case types.notesCloseModal:
      return {
        ...state,
        saveNote: false,
      };
    default:
      return state;
  }
};
