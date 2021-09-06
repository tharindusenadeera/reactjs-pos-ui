import { HALF_PAY_ORDER, ORDER_FULL_SETTLED,DELETE_ALL } from "../constants/ActionTypes";

const initialState = {
  totalAmount: null,
  amountRemain: null,
  fullyPaid: null,
};

const halfPayReducer = (state = initialState, action) => {
  switch (action.type) {
    case HALF_PAY_ORDER:
      return action.payload;
    case ORDER_FULL_SETTLED:
      return action.payload;
    case DELETE_ALL:
      return initialState;
    default:
      return state;
  }
};

export default halfPayReducer;
