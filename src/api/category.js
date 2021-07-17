import Axios from "axios";

export const categoryList = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/v1/categories`);
}