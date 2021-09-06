import {
  ORDER,
  ADD_ORDER,
  TABLE_NUMBER,
  HALF_PAY_ORDER,
  ORDER_FULL_SETTLED,
} from "../constants/ActionTypes";
import * as api from "../api/order";

export const addOrder = (data) => {
  return {
    type: ADD_ORDER,
    payload: data,
  };
};

export const addItem = (item) => async (dispatch) => {
  try {
    const { data } = await api.addOrder(item);

    if (data?.status === "success") {
      dispatch(addOrder(data?.data));
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateItem = (item) => async (dispatch) => {
  try {
    const { data } = await api.updateOrder(item?.order_id, item);

    if (data?.status === "success") {
      dispatch(addOrder(data?.data));
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const orderById = (item) => {
  return {
    type: ORDER,
    payload: item,
  };
};

export const addTable = (item) => {
  return {
    type: TABLE_NUMBER,
    payload: item,
  };
};

export const halfPayTheOrder = (data) => {
  return {
    type: HALF_PAY_ORDER,
    payload: data,
  };
};

export const fullSettledTheOrder = (data) => {
  return {
    type: ORDER_FULL_SETTLED,
    payload: data,
  };
};
