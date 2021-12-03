import { AUTHENTICATED, ERROR, IS_FETCHING, MEAL_TYPE, RESET_MEAL_TYPE, CLICKED_ORDER_TAB } from "../constants/ActionTypes";

export const authenticate = payload => {
  return { type: AUTHENTICATED, payload };
};

export const addError = (data) => {
  return {
    type: ERROR,
    payload: data,
  };
};

export const addMealType = (data) => {
  return {
    type: MEAL_TYPE,
    payload: data,
  };
};

export const resetMealType = () => {
  return {
    type: RESET_MEAL_TYPE
  };
};

export const isFetching = (data) => {
  return {
    type: IS_FETCHING,
    payload: data,
  };
}

export const clickedOrderTab = (data) => {
  return {
    type: CLICKED_ORDER_TAB,
    payload: data,
  };
}