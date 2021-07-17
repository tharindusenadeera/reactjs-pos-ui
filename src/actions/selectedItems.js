import {ADD_ITEM} from '../constants/ActionTypes';

export const addItem = (item) => {
    return {
        type: ADD_ITEM,
        payload: item
    }
}