import axios from "axios";

export const getAllOrders = (params = {}) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/v1/orders`, {
    params,
  });
};

export const addOrder = (newOrder) => {
  return API.post(`${process.env.REACT_APP_API_URL}/v1/order`, newOrder);
};
