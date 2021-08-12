import { ERROR, MEAL_TYPE, RESET_MEAL_TYPE} from "../constants/ActionTypes";

const initialState = {
  isError: false,
  mealType: "dine_in",
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return { ...state, isError: action.payload };

    case MEAL_TYPE:
      return { ...state, mealType: action.payload };

    case RESET_MEAL_TYPE:
      return initialState;
      
    default:
      return state;
  }
};

export default commonReducer;
