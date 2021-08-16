import axios from "axios";

export const getAllOrders = (params = {}) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/v1/orders`, {
    params,
  });
};

export const addOrder = (newOrder) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/v1/new-order`, newOrder);
};

export const getOrder = (id) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/v1/get-order/${id}`);
}

export const updateOrder = (id, updatedOrder) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/v1/edit-order/${id}`, updatedOrder);
};

export const placePayment = (id, data) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/v1/settled_payment/${id}`, data);
}