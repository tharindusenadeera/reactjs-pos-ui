import { ADD_ORDER } from "../constants/ActionTypes";
  
const orderReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_ORDER:
            return [...state, action.payload];

        default:
            return state;
    }
};

export default orderReducer;
  