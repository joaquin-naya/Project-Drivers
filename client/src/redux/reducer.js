import { GET_ALL, GET_DETAIL } from "./actions";

let initialState = {
  allDrivers: [],
  detail: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL:
      return {
        ...state,
        allDrivers: action.payload,
        detail: action.payload,
      };

    case GET_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
