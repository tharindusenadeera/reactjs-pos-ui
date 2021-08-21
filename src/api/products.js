import axios from "axios";

export const productsList = (params = {}) => {
  return axios.get(`${process.env.REACT_APP_API_URL}/v1/menu-items`, {
    headers: {
      Authorization: localStorage.ACCESS_TOKEN,
    },
    params,
  });
};
