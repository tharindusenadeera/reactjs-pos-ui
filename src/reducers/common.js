import { ERROR } from "../constants/ActionTypes";

const initialState = {
  isError: false,
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return { ...state, isError: action.payload };
    default:
      return state;
  }
};

export default commonReducer;