import {
  ADD_ORDER,
  DELETE_ALL,
  ORDER,
  TABLE_NUMBER,
} from "../constants/ActionTypes";

const initialState = {
  addOrder: {},
  order: {},
  tableNumber: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return { ...state, addOrder: action.payload };
    case ORDER:
      return { ...state, order: action.payload };
    case TABLE_NUMBER:
      return { ...state, tableNumber: action.payload };
    case DELETE_ALL:
      return initialState;
    default:
      return state;
  }
};

export default orderReducer;
