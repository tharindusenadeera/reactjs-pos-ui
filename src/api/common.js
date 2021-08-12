import Axios from "axios";

export const getCities = () => {
    return Axios.get(`${process.env.REACT_APP_API_URL}/v1/cities`);
}

export const login = data => {
    return Axios.get(`${process.env.REACT_APP_API_URL}/v1/login`);
}
