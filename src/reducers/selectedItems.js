import {
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  ALL_ITEMS,
  DELETE_ALL,
  UPDATE_ALL,
} from "../constants/ActionTypes";

const initilailState = {
  metaData: null,
  productList: []
}

const selectedItemReducer = (selectedItems = initilailState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...selectedItems,
        productList : [...selectedItems.productList, action.payload]
        };

    case UPDATE_ITEM:
      return {
        ...selectedItems,
        productList : selectedItems.productList.map((item) =>
        item.key === action.payload.key ? action.payload : item
        )
      };

    case DELETE_ITEM:
      return  {
        ...selectedItems,
        productList : selectedItems.productList.filter((item) => item.key !== action.payload.key)
      };

    case ALL_ITEMS:
      return selectedItems.productList;

    case DELETE_ALL:
      return initilailState;
    
    case UPDATE_ALL:
      return {
        metaData: action.payload.metaData,
        productList: action.payload.productList
      };

    default:
      return selectedItems;
  }
};

export default selectedItemReducer;
