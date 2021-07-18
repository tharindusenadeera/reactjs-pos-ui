import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM} from '../constants/ActionTypes';

export const addItem = (item) => {
    return {
        type: ADD_ITEM,
        payload: item
    }
}

export const updateItem = (item) => {
    return {
        type: UPDATE_ITEM,
        payload: item
    }
}

export const deleteItem = (item) => {
    return {
        type: DELETE_ITEM,
        payload: item
    }
}
