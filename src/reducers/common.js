import { ERROR, MEAL_TYPE } from "../constants/ActionTypes";

const initialState = {
  isError: false,
  mealType: 1,
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return { ...state, isError: action.payload };
    case MEAL_TYPE:
      return { ...state, mealType: action.payload };
    default:
      return state;
  }
};

export default commonReducer;
