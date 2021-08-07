import { ADD_ORDER, ORDER } from "../constants/ActionTypes";

const initialState = {
  addOrder: [],
  order: {},
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return { ...state, addOrder: action.payload };
    case ORDER:
      return { ...state, order: action.payload };

    default:
      return state;
  }
};

export default orderReducer;
