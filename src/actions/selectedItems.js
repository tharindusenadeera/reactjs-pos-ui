import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, ALL_ITEMS, DELETE_ALL, UPDATE_ALL, UPDATE_METADATA } from '../constants/ActionTypes';

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
export const addAllItems = (data) => {
    return {
        type: UPDATE_ALL,
        payload: data
    }
}

export const updateMetaData = (data) => {
    return {
        type: UPDATE_METADATA,
        payload: data
    }
}