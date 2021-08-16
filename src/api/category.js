import Axios from "axios";

export const categoryList = () => {
  console.log(localStorage.ACCESS_TOKEN);
  return Axios.get(`${process.env.REACT_APP_API_URL}/v1/categories`, {
    headers: {
      Authorization: localStorage.ACCESS_TOKEN,
    },
  });
};
