import { ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from '../constants/ActionTypes';

const selectedItemReducer = (selectedItems = [] , action) =>{
    switch (action.type) {
        case ADD_ITEM:
            return [...selectedItems, action.payload];

        case UPDATE_ITEM:
            // console.log(selectedItems)
            return selectedItems.map((item) => (item.key === action.payload.key) ? action.payload : item);
        
        case DELETE_ITEM:
            return selectedItems.filter((item) => item.key !== action.payload.key);

        default:
            return selectedItems;
    }
}

export default selectedItemReducer;