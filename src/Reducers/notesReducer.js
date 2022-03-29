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

const initialState = { notes: [], active: null };
export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesActive:
      return {
        ...state,
        active: { ...action.payload },
      };
    case types.notesLoad:
      //console.log("esto vale action.payload ", action.payload);
      return {
        ...state,
        notes: [...action.payload],
      };
    default:
      return state;
  }
};
