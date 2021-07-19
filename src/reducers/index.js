import { combineReducers } from "redux";
import selectedItems from './selectedItems';
import customer from './customer';

export default combineReducers({
    selectedItems,
    customer
});
