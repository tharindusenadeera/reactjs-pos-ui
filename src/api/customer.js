import Axios from "axios";

export const getAllCustomers = () => {
  return Axios.get(`${process.env.REACT_APP_API_URL}/v1/customers`, {
    headers: {
      Authorization: localStorage.ACCESS_TOKEN,
    },
  });
};

export const addCustomer = (data) => {
  return Axios.post(`${process.env.REACT_APP_API_URL}/v1/new-customer`, data, {
    headers: {
      Authorization: localStorage.ACCESS_TOKEN,
    },
  });
};

export const getCustomerById = (id) => {
  return Axios.get(`${process.env.REACT_APP_API_URL}/v1/customer/${id}`, {
    headers: {
      Authorization: localStorage.ACCESS_TOKEN,
    },
  });
};
