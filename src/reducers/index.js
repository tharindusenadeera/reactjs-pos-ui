import { combineReducers } from "redux";
import selectedItems from "./selectedItems";
import customer from "./customer";
import common from "./common";
import order from "./order";
import products from "./products";
import halfPayOrder from "./halfPay";

export default combineReducers({
  selectedItems,
  customer,
  common,
  order,
  products,
  halfPayOrder,
});
