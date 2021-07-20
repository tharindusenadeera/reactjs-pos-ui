import Axios from "axios";

export const addCustomer = (data) => {
    console.log("== API request ===", data);
  return Axios.post(`${process.env.REACT_APP_API_URL}/v1/new-customer`, data);
};
