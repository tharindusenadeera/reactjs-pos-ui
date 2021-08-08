import {
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  ALL_ITEMS,
  DELETE_ALL,
  UPDATE_ALL,
} from "../constants/ActionTypes";

const selectedItemReducer = (selectedItems = [], action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...selectedItems, action.payload];

    case UPDATE_ITEM:
      return selectedItems.map((item) =>
        item.key === action.payload.key ? action.payload : item
      );

    case DELETE_ITEM:
      return selectedItems.filter((item) => item.key !== action.payload.key);

    case ALL_ITEMS:
      return [...selectedItems, action.payload];

    case DELETE_ALL:
      return [];
    
    case UPDATE_ALL:
      return action.payload;

    default:
      return selectedItems;
  }
};

export default selectedItemReducer;
