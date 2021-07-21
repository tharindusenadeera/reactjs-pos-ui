import {
  ADD_CUSTOMER_TRIGGERED,
  ADD_CUSTOMER,
  CUSTOMER_DETAILS,
  SELECTED_CITY,
} from "../constants/ActionTypes";

export const addCustomerTriggered = (data) => {
  return {
    type: ADD_CUSTOMER_TRIGGERED,
    payload: data,
  };
};

export const addCutomer = (data) => {
  return {
    type: ADD_CUSTOMER,
    payload: data,
  };
};

export const customerDetails = (data) => {
  console.log("=== action data ====", data);
  return {
    type: CUSTOMER_DETAILS,
    payload: data,
  };
};

export const selectedCityDetails = (data) => {
  return {
    type: SELECTED_CITY,
    payload: data,
  };
};
