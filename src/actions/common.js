import { AUTHENTICATED, ERROR, MEAL_TYPE, RESET_MEAL_TYPE } from "../constants/ActionTypes";

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