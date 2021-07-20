import {
  ADD_CUSTOMER_TRIGGERED,
  ADD_CUSTOMER,
  CUSTOMER_DETAILS,
} from "../constants/ActionTypes";

const initialState = {
  isAdd: false,
  isCancel: false,
  addCustomer: {},
  customerDetails: {}
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CUSTOMER_TRIGGERED:
      return { ...state, isAdd: action.payload };
    case ADD_CUSTOMER:
      return { ...state, addCustomer: action.payload };
    case CUSTOMER_DETAILS:
      return { ...state, addCustomer: action.payload };
    default:
      return state;
  }
};

export default customerReducer;
