import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, ALL_ITEMS, DELETE_ALL, UPDATE_ALL } from '../constants/ActionTypes';

/** add a product item to selected products list */
export const addItem = (item) => {
    return {
        type: ADD_ITEM,
        payload: item
    }
}

/** update a single product item from selected products list */
export const updateItem = (item) => {
    return {
        type: UPDATE_ITEM,
        payload: item
    }
}

/** delete a single product item from selected products list */
export const deleteItem = (item) => {
    return {
        type: DELETE_ITEM,
        payload: item
    }
}

/** get selected products list */
export const getAllItems = (item) => {
    return {
        type: ALL_ITEMS,
        payload: item
    }
}

/** delete selected products list */
export const deleteAllItems = () => {
    return {
        type: DELETE_ALL,
    }
}

/** update selected products list from given list*/
export const addAllItems = (items) => {
    return {
        type: UPDATE_ALL,
        payload: items
    }
}