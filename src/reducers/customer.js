import {
  ADD_CUSTOMER_TRIGGERED,
  ADD_CUSTOMER,
  CUSTOMER_DETAILS,
  SELECTED_CITY,
  DELETE_ALL,
  DELIVERY_INFORMATIONS,
} from "../constants/ActionTypes";

const initialState = {
  isAdd: false,
  isCancel: false,
  addCustomer: {},
  customerDetails: {},
  selectedCity: {},
  deliveryInformations: {},
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CUSTOMER_TRIGGERED:
      return { ...state, isAdd: action.payload };
    case ADD_CUSTOMER:
      return { ...state, addCustomer: action.payload };
    case CUSTOMER_DETAILS:
      return { ...state, customerDetails: action.payload };
    case SELECTED_CITY:
      return { ...state, selectedCity: action.payload };
    case DELIVERY_INFORMATIONS:
      return { ...state, deliveryInformations: action.payload };
    case DELETE_ALL:
      return initialState;
    default:
      return state;
  }
};

export default customerReducer;
