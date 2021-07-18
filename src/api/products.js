import axios from "axios";

export const productsList = (params = {}) => {
  console.log("params", params);
  return axios.get(`${process.env.REACT_APP_API_URL}/v1/menu-items`, {
    params,
  });
};
