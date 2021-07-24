import axios from "axios";

export const getAllOrders = (params = {}) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/v1/orders`, {
    params,
  });
};