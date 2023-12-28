import axios from 'axios';
const BASE_URL = 'http://localhost:3000';
import toast from 'react-hot-toast';

const Api = axios.create({ baseURL: BASE_URL, withCredentials: true });

Api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            const { data } = error.response;
            console.log(data.message);
            toast.error(data.message);
        } else {
            console.log(error);
        }
        return Promise.reject(error);
    }
);

export default Api;