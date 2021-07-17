import {ADD_ITEM} from '../constants/ActionTypes';

const selectedItemReducer = (selectedItems = [] , action) =>{
    switch (action.type) {
        case ADD_ITEM:
            return [...selectedItems, action.payload];
        default:
            return selectedItems;
    }
}

export default selectedItemReducer;