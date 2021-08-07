import { ADD_ORDER, ORDER } from '../constants/ActionTypes';
import * as api from '../api/order';

export const addItem = (item) => async (dispatch) => {
    try {
        const {data} = await api.addOrder(item);
        dispatch({ type: ADD_ORDER, payload: data});

        return data;
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
