import { ERROR, MEAL_TYPE } from "../constants/ActionTypes";

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
