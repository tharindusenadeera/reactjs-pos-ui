import { SAVE_PRODUCT } from "../constants/ActionTypes";

const productReducer = (state = [], action) => {
  switch (action.type) {
    case SAVE_PRODUCT:
      return action.payload;
    default:
      return state;
  }
};

export default productReducer;
