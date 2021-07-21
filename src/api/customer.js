import Axios from "axios";

export const getAllCustomers = () => {
    return Axios.get(`${process.env.REACT_APP_API_URL}/api/v1/customers`);
}

export const addCustomer = (data) => {
  return Axios.post(`${process.env.REACT_APP_API_URL}/v1/new-customer`, data);
};