import { ERROR, MEAL_TYPE, RESET_MEAL_TYPE, AUTHENTICATED } from "../constants/ActionTypes";

const initialState = {
  isError: false,
  mealType: "dine_in",
  authenticated: false
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return { ...state, isError: action.payload };
    case MEAL_TYPE:
      return { ...state, mealType: action.payload };
    case RESET_MEAL_TYPE:
      return initialState;
    case AUTHENTICATED:
      return { ...state, authenticated: action.payload };
    default:
      return state;
  }
};

export default commonReducer;
