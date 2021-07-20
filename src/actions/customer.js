import { ADD_CUSTOMER_TRIGGERED, ADD_CUSTOMER } from '../constants/ActionTypes';

export const addCustomerTriggered = (data) => {
    return {
        type: ADD_CUSTOMER_TRIGGERED,
        payload: data
    }
}

export const addCutomer = data => {
    return {
        type: ADD_CUSTOMER,
        payload: data
    }
}