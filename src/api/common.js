import Axios from "axios";

export const getCities = () => {
  return Axios.get(`${process.env.REACT_APP_API_URL}/v1/cities`, {
    headers: {
      Authorization: localStorage.ACCESS_TOKEN,
    },
  });
};

export const login = (data) => {
  return Axios.post(`${process.env.REACT_APP_API_URL}/v1/login`, data);
};

export const printBill = (id) => {
  return Axios.get(
    `${process.env.REACT_APP_API_URL}/v1/orders/pos-print/${id}`,
    {
      headers: {
        Authorization: localStorage.ACCESS_TOKEN,
      },
    }
  );
};
