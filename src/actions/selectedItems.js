import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, ALL_ITEMS, DELETE_ALL } from '../constants/ActionTypes';

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

export const allItems = (item) => {
    return {
        type: ALL_ITEMS,
        payload: item
    }
}

export const deleteAll = () => {
    return {
        type: DELETE_ALL,
    }
}