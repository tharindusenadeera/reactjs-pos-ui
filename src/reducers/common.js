import {
  ERROR,
  MEAL_TYPE,
  RESET_MEAL_TYPE,
  AUTHENTICATED,
  IS_FETCHING,
  CLICKED_ORDER_TAB
} from "../constants/ActionTypes";

const initialState = {
  isError: false,
  mealType: "dine_in",
  authenticated: false,
  isFetching: false,
  clickedOrderTab: 'dine_in'
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
    case IS_FETCHING:
      return { ...state, isFetching: action.payload };
    case CLICKED_ORDER_TAB:
      return { ...state, clickedOrderTab: action.payload};
    default:
      return state;
  }
};

export default commonReducer;
