import { ORDER, ADD_ORDER, TABLE_NUMBER } from '../constants/ActionTypes';
import * as api from '../api/order';

export const addOrder = (data) => {
    return {
        type: ADD_ORDER,
        payload: data
      };
}

export const addItem = (item) => async (dispatch) => {
    try {
        const {data} = await api.addOrder(item);

        if (data?.status === "success") {
            dispatch(addOrder(data?.data));
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateItem = (item) => async (dispatch) => {
    try {
        const {data} = await api.updateOrder(item?.order_id, item);

        if (data?.status === "success") {
            dispatch(addOrder(data?.data));
            return data;
        }
    } catch (error) {
        console.log(error);
    }
}

export const orderById = item => {
    return {
        type: ORDER,
        payload: item,
      };
}

export const addTable = item => {
    return {
        type: TABLE_NUMBER,
        payload: item,
      };
}

