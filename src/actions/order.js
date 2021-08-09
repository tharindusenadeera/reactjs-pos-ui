import { ORDER } from '../constants/ActionTypes';
import * as api from '../api/order';

export const addItem = (item) => async (dispatch) => {
    try {
        const {data} = await api.addOrder(item);

        return data;
    } catch (error) {
        console.log(error);
    }
}

export const updateItem = (id, item) => async (dispatch) => {
    try {
        const {data} = await api.updateOrder(id, item);

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
