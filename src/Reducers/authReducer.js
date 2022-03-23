import { types } from "../Types/types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      const { uid, displayName } = action.payload;
      return {
        uid,
        name: displayName,
      };
    case types.logout:
      return {};
    default:
      return state;
  }
};
